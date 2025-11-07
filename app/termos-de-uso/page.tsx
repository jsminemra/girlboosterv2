'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TermsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Pega o e-mail salvo no sessionStorage pelo login
  const getEmailFromSession = (): string | null => {
    try {
      const raw = sessionStorage.getItem('user');
      if (!raw) return null;
      const u = JSON.parse(raw);
      return u?.email ?? null;
    } catch {
      return null;
    }
  };

  const accept = async () => {
    try {
      setLoading(true);
      setErr(null);

      const email = getEmailFromSession();
      if (!email) {
        setErr('Não foi possível identificar sua conta. Faça login novamente.');
        return;
      }

      const res = await fetch('/api/terms/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Falha ao salvar o aceite');
      }

      router.replace('/home');
    } catch (e: any) {
      setErr(e?.message || 'Algo deu errado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Termos de Uso – Girl Booster</h1>
      <p className="text-gray-400 mb-6">Última atualização: 06/11/2025</p>

      <div className="prose prose-invert max-w-none mb-8 text-sm leading-relaxed">
        <p>
          Bem-vinda ao Girl Booster (“Plataforma” ou “Girl Booster”), acessível em
          girlboosterapp.com.br. Estes Termos de Uso (“Termos”) regulam o acesso e a
          utilização do site, áreas de membros, aplicativos e conteúdos disponibilizados
          por girlboosterapp.com.br (“Nós” ou “Empresa”). Para contato institucional e
          suporte, utilize fitprimept@gmail.com.
        </p>
        <p>
          Ao acessar ou utilizar a Plataforma, você (“Usuária”) declara ter lido,
          entendido e aceito integralmente estes Termos e a nossa Política de Privacidade.
        </p>

        <h2>1. Natureza dos produtos e acesso</h2>
        <p>
          1.1. Os produtos oferecidos consistem em conteúdos digitais e serviços on-line
          (programas, planos e treinos, vídeos, PDFs, áudios, lives, comunidades e
          materiais complementares).
        </p>
        <p>
          1.2. A disponibilização ocorre por acesso imediato após confirmação do
          pagamento ou conforme cronograma da oferta (ex.: liberação de módulos por
          etapas).
        </p>

        <h2>2. Confirmação de acesso, entrega e renúncia a MED/chargeback</h2>
        <p>
          2.1. Ao acessar a área de membros, fazer download/streaming de qualquer conteúdo
          ou iniciar o consumo dos treinos, você declara expressamente que o produto
          digital foi disponibilizado e está “recebido/entregue”, para todos os fins.
        </p>
        <p>
          2.2. Em razão da natureza digital, você concorda em não abrir “MED”, disputas de
          mediação, contestações ou solicitações de chargeback junto a
          intermediadores/pagadores, salvo nas hipóteses legalmente irrenunciáveis (ex.:
          fraude, vício do produto, não disponibilização de acesso, duplicidade de
          cobrança).
        </p>
        <p>
          2.3. Ao aceitar estes Termos, você autoriza a apresentação desta declaração
          (itens 2.1 e 2.2) a plataformas de pagamento e emissores caso haja contestação
          indevida.
        </p>
        <p>
          2.4. Nada restringe direitos inderrogáveis do consumidor previstos em lei. Em
          caso de dificuldade de acesso, contate fitprimept@gmail.com em até [prazo, ex.: 7 dias corridos]
          a contar da confirmação do pagamento.
        </p>

        <h2>3. Política de reembolso e cancelamento</h2>
        <p>
          3.1. Salvo previsão específica na oferta, não há reembolso após o primeiro
          acesso à área de membros/conteúdo, pela natureza digital e imediata fruição do
          produto.
        </p>
        <p>
          3.2. Se houver garantia comercial (ex.: “7 dias”), os termos e prazos descritos
          na página da oferta prevalecem naquilo que for mais favorável à Usuária,
          respeitada a legislação.
        </p>
        <p>
          3.3. Em falhas técnicas imputáveis à Plataforma que impeçam o acesso por período
          superior a [x horas/dias], o prazo de acesso será prorrogado proporcionalmente,
          ou adotaremos medidas compensatórias razoáveis.
        </p>

        <h2>4. Conta, segurança e conduta</h2>
        <p>
          4.1. O acesso é pessoal e intransferível. É vedado compartilhar login/senha,
          revender, sublicenciar, publicar ou expor conteúdos em ambientes públicos/abertos.
        </p>
        <p>
          4.2. Mantenha suas credenciais em sigilo e avise-nos imediatamente sobre uso
          não autorizado.
        </p>
        <p>
          4.3. É proibido usar a Plataforma para fins ilícitos, assediar outras usuárias,
          burlar segurança, realizar engenharia reversa, scraping ou automações não
          autorizadas.
        </p>

        <h2>5. Propriedade intelectual e licença de uso</h2>
        <p>
          5.1. Todos os treinos, programas, vídeos, textos, marcas, logotipos, cursos e
          materiais pertencem a girlboosterapp.com.br e/ou licenciantes e são protegidos por
          direitos autorais e de propriedade intelectual.
        </p>
        <p>
          5.2. Concedemos a você licença limitada, revogável, não exclusiva e
          intransferível, apenas para uso pessoal e não comercial, pelo prazo e condições
          informados na oferta.
        </p>
        <p>
          5.3. É estritamente proibido copiar, gravar, reproduzir, transmitir, distribuir,
          vender, doar, disponibilizar a terceiros, publicar em redes sociais/plataformas
          de compartilhamento ou criar obras derivadas com base nos conteúdos, salvo
          autorização prévia e por escrito via fitprimept@gmail.com.
        </p>
        <p>
          5.4. O descumprimento pode ensejar suspensão/encerramento de acesso, cobrança de
          perdas e danos e medidas administrativas ou judiciais cabíveis.
        </p>

        <h2>6. Direitos de imagem, voz e depoimentos</h2>
        <p>
          6.1. Em aulas ao vivo, comunidades, eventos, mentorias, grupos e atividades correlatas,
          é vedado gravar, reproduzir ou divulgar a imagem, voz e conteúdos de outras usuárias,
          instrutoras ou convidadas, sem autorização expressa.
        </p>
        <p>
          6.2. Caso você envie voluntariamente depoimentos, fotos, vídeos, resultados,
          comentários ou avaliações para girlboosterapp.com.br (e-mail, formulário, WhatsApp,
          DM, comunidade etc.), você autoriza, gratuitamente, em caráter mundial e por prazo
          indeterminado, a fixação, edição, adaptação e uso de sua imagem, nome (ou @/apelido),
          voz e conteúdo exclusivamente para fins de divulgação institucional e comercial do
          Girl Booster, em quaisquer meios (digitais e físicos).
        </p>
        <p>
          6.3. Você pode revogar a autorização do item 6.2 a qualquer tempo, mediante solicitação
          para fitprimept@gmail.com; a revogação não afeta divulgações já realizadas de boa-fé.
        </p>
        <p>
          6.4. girlboosterapp.com.br não reivindica direitos sobre sua imagem/voz fora das autorizações
          fornecidas por você. Os conteúdos didáticos e materiais da Plataforma permanecem de titularidade
          de girlboosterapp.com.br e licenciantes (item 5).
        </p>

        <h2>7. Suporte técnico</h2>
        <p>
          7.1. Oferecemos suporte técnico e de acesso pelo e-mail fitprimept@gmail.com em dias úteis,
          das [horários e fuso].
        </p>
        <p>
          7.2. Para agilizar, envie comprovante de pagamento, e-mail de cadastro e prints do erro.
        </p>

        <h2>8. Pagamentos e faturamento</h2>
        <p>
          8.1. Os pagamentos são processados por [nome do intermediador/checkout]; ao comprar, você concorda
          com os termos do intermediador.
        </p>
        <p>
          8.2. Em planos de assinatura, a cobrança é recorrente até cancelamento, conforme a oferta.
        </p>
        <p>
          8.3. Em caso de atraso, poderemos suspender o acesso até regularização.
        </p>

        <h2>9. Suspensão e encerramento</h2>
        <p>
          9.1. Podemos suspender/encerrar o acesso em caso de violação destes Termos, suspeita de fraude,
          pirataria, uso indevido do conteúdo ou determinação legal/administrativa.
        </p>
        <p>
          9.2. Em encerramento sem culpa da Usuária, buscaremos solução proporcional e razoável (ex.: extensão
          de prazo, crédito ou outra medida adequada).
        </p>

        <h2>10. Limitação de responsabilidade</h2>
        <p>
          10.1. Os conteúdos têm caráter educacional/informativo e não substituem acompanhamento médico,
          nutricional, psicológico ou profissional.
        </p>
        <p>
          10.2. A Usuária é responsável por avaliar suas condições de saúde e buscar orientação antes de iniciar
          qualquer treino.
        </p>
        <p>
          10.3. Na máxima extensão permitida por lei, não nos responsabilizamos por danos indiretos, lucros
          cessantes ou perda de dados decorrentes do uso indevido da Plataforma.
        </p>

        <h2>11. Privacidade e dados pessoais</h2>
        <p>
          11.1. O tratamento de dados pessoais ocorre conforme a Política de Privacidade disponível em
          girlboosterapp.com.br, em conformidade com a LGPD (Lei nº 13.709/2018).
        </p>
        <p>
          11.2. Você está ciente das finalidades e bases legais do tratamento, inclusive para comunicação
          sobre o produto adquirido.
        </p>

        <h2>12. Disposições gerais</h2>
        <p>
          12.1. Podemos atualizar estes Termos a qualquer tempo, publicando a versão revisada com a data
          de “Última atualização”. Alterações materialmente relevantes serão comunicadas pelos canais de
          contato informados.
        </p>
        <p>
          12.2. A nulidade de qualquer cláusula não prejudica as demais.
        </p>
        <p>
          12.3. Aplica-se a legislação brasileira. Fica eleito o foro de [cidade/UF], com renúncia a qualquer
          outro, salvo foro do domicílio da consumidora quando aplicável por lei.
        </p>

        <h2>13. Contato</h2>
        <p>
          Dúvidas? Fale com a gente: <span>fitprimept@gmail.com</span>.<br />
          Site oficial: <span>girlboosterapp.com.br</span>
        </p>
      </div>

      {err && <p className="text-red-400 mb-4">{err}</p>}

      <button
        onClick={accept}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-600 transition disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Aceitar e continuar'}
      </button>
    </main>
  );
}
