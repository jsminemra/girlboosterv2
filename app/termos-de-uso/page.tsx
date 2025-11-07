'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // pegue o userId da forma que você já usa no app:
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const handleAccept = async () => {
    if (!userId) { router.replace('/login'); return; }
    setLoading(true);
    await fetch('/api/terms/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    setLoading(false);
    router.replace('/home');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Termos de Uso — Girl Booster</h1>
      <p className="prose max-w-none mb-6">
        (Termos de Uso – Girl Booster

Última atualização: 06/11/2025

Bem-vinda ao Girl Booster (“Plataforma” ou “Girl Booster”), acessível em girlboosterapp.com.br. Estes Termos de Uso (“Termos”) regulam o acesso e a utilização do site, áreas de membros, aplicativos e conteúdos disponibilizados por girlboosterapp.com.br (“Nós” ou “Empresa”). Para contato institucional e suporte, utilize fitprimept@gmail.com
.
Ao acessar ou utilizar a Plataforma, você (“Usuária”) declara ter lido, entendido e aceito integralmente estes Termos e a nossa Política de Privacidade.

1. Natureza dos produtos e acesso

1.1. Os produtos oferecidos consistem em conteúdos digitais e serviços on-line (programas, planos e treinos, vídeos, PDFs, áudios, lives, comunidades e materiais complementares).
1.2. A disponibilização ocorre por acesso imediato após confirmação do pagamento ou conforme cronograma da oferta (ex.: liberação de módulos por etapas).

2. Confirmação de acesso, entrega e renúncia a MED/chargeback

2.1. Ao acessar a área de membros, fazer download/streaming de qualquer conteúdo ou iniciar o consumo dos treinos, você declara expressamente que o produto digital foi disponibilizado e está “recebido/entregue”, para todos os fins.
2.2. Em razão da natureza digital, você concorda em não abrir “MED”, disputas de mediação, contestações ou solicitações de chargeback junto a intermediadores/pagadores, salvo nas hipóteses legalmente irrenunciáveis (ex.: fraude, vício do produto, não disponibilização de acesso, duplicidade de cobrança).
2.3. Ao aceitar estes Termos, você autoriza a apresentação desta declaração (itens 2.1 e 2.2) a plataformas de pagamento e emissores caso haja contestação indevida.
2.4. Nada restringe direitos inderrogáveis do consumidor previstos em lei. Em caso de dificuldade de acesso, contate fitprimept@gmail.com
 em até [prazo, ex.: 7 dias corridos] a contar da confirmação do pagamento.

3. Política de reembolso e cancelamento

3.1. Salvo previsão específica na oferta, não há reembolso após o primeiro acesso à área de membros/conteúdo, pela natureza digital e imediata fruição do produto.
3.2. Se houver garantia comercial (ex.: “7 dias”), os termos e prazos descritos na página da oferta prevalecem naquilo que for mais favorável à Usuária, respeitada a legislação.
3.3. Em falhas técnicas imputáveis à Plataforma que impeçam o acesso por período superior a [x horas/dias], o prazo de acesso será prorrogado proporcionalmente, ou adotaremos medidas compensatórias razoáveis.

4. Conta, segurança e conduta

4.1. O acesso é pessoal e intransferível. É vedado compartilhar login/senha, revender, sublicenciar, publicar ou expor conteúdos em ambientes públicos/abertos.
4.2. Mantenha suas credenciais em sigilo e avise-nos imediatamente sobre uso não autorizado.
4.3. É proibido usar a Plataforma para fins ilícitos, assediar outras usuárias, burlar segurança, realizar engenharia reversa, scraping ou automações não autorizadas.

5. Propriedade intelectual e licença de uso

5.1. Todos os treinos, programas, vídeos, textos, marcas, logotipos, cursos e materiais pertencem a girlboosterapp.com.br e/ou licenciantes e são protegidos por direitos autorais e de propriedade intelectual.
5.2. Concedemos a você licença limitada, revogável, não exclusiva e intransferível, apenas para uso pessoal e não comercial, pelo prazo e condições informados na oferta.
5.3. É estritamente proibido copiar, gravar, reproduzir, transmitir, distribuir, vender, doar, disponibilizar a terceiros, publicar em redes sociais/plataformas de compartilhamento ou criar obras derivadas com base nos conteúdos, salvo autorização prévia e por escrito via fitprimept@gmail.com
.
5.4. O descumprimento pode ensejar suspensão/encerramento de acesso, cobrança de perdas e danos e medidas administrativas ou judiciais cabíveis.

6. Direitos de imagem, voz e depoimentos

6.1. Em aulas ao vivo, comunidades, eventos, mentorias, grupos e atividades correlatas, é vedado gravar, reproduzir ou divulgar a imagem, voz e conteúdos de outras usuárias, instrutoras ou convidadas, sem autorização expressa.
6.2. Caso você envie voluntariamente depoimentos, fotos, vídeos, resultados, comentários ou avaliações para girlboosterapp.com.br (e-mail, formulário, WhatsApp, DM, comunidade etc.), você autoriza, gratuitamente, em caráter mundial e por prazo indeterminado, a fixação, edição, adaptação e uso de sua imagem, nome (ou @/apelido), voz e conteúdo exclusivamente para fins de divulgação institucional e comercial do Girl Booster, em quaisquer meios (digitais e físicos).
6.3. Você pode revogar a autorização do item 6.2 a qualquer tempo, mediante solicitação para fitprimept@gmail.com
; a revogação não afeta divulgações já realizadas de boa-fé.
6.4. girlboosterapp.com.br não reivindica direitos sobre sua imagem/voz fora das autorizações fornecidas por você. Os conteúdos didáticos e materiais da Plataforma permanecem de titularidade de girlboosterapp.com.br e licenciantes (item 5).

7. Suporte técnico

7.1. Oferecemos suporte técnico e de acesso pelo e-mail fitprimept@gmail.com
 em dias úteis, das [horários e fuso].
7.2. Para agilizar, envie comprovante de pagamento, e-mail de cadastro e prints do erro.

8. Pagamentos e faturamento

8.1. Os pagamentos são processados por [nome do intermediador/checkout]; ao comprar, você concorda com os termos do intermediador.
8.2. Em planos de assinatura, a cobrança é recorrente até cancelamento, conforme a oferta.
8.3. Em caso de atraso, poderemos suspender o acesso até regularização.

9. Suspensão e encerramento

9.1. Podemos suspender/encerrar o acesso em caso de violação destes Termos, suspeita de fraude, pirataria, uso indevido do conteúdo ou determinação legal/administrativa.
9.2. Em encerramento sem culpa da Usuária, buscaremos solução proporcional e razoável (ex.: extensão de prazo, crédito ou outra medida adequada).

10. Limitação de responsabilidade

10.1. Os conteúdos têm caráter educacional/informativo e não substituem acompanhamento médico, nutricional, psicológico ou profissional.
10.2. A Usuária é responsável por avaliar suas condições de saúde e buscar orientação antes de iniciar qualquer treino.
10.3. Na máxima extensão permitida por lei, não nos responsabilizamos por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso indevido da Plataforma.

11. Privacidade e dados pessoais

11.1. O tratamento de dados pessoais ocorre conforme a Política de Privacidade disponível em girlboosterapp.com.br, em conformidade com a LGPD (Lei nº 13.709/2018).
11.2. Você está ciente das finalidades e bases legais do tratamento, inclusive para comunicação sobre o produto adquirido.

12. Disposições gerais

12.1. Podemos atualizar estes Termos a qualquer tempo, publicando a versão revisada com a data de “Última atualização”. Alterações materialmente relevantes serão comunicadas pelos canais de contato informados.
12.2. A nulidade de qualquer cláusula não prejudica as demais.
12.3. Aplica-se a legislação brasileira. Fica eleito o foro de [cidade/UF], com renúncia a qualquer outro, salvo foro do domicílio da consumidora quando aplicável por lei.

13. Contato

Dúvidas? Fale com a gente: fitprimept@gmail.com
.
Site oficial: girlboosterapp.com.br)
      </p>

      <label htmlFor="accept" className="flex items-start gap-3 mb-6">
        <input
          id="accept"
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-gray-300"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span className="text-sm text-gray-700">Eu li e concordo com os Termos de Uso.</span>
      </label>

      <button
        disabled={!checked || loading}
        aria-busy={loading ? 'true' : 'false'}
        onClick={handleAccept}
        className="inline-flex items-center rounded-xl px-4 py-2 text-white bg-black disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Aceito os Termos'}
      </button>
    </div>
  );
}
