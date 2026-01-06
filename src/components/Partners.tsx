'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface Partner {
  name: string;
  description: string;
  image: string;
  subtitle?: string;
  url?: string;
}

export default function Partners() {
  const { t } = useLanguage()

  const governmentPartners = [
    {
      name: t({ JP: "BioNexus ステータス企業", EN: "BioNexus Status Company" }),
      subtitle: t({ JP: "マレーシア政府認可", EN: "Malaysian Government Approved" }),
      description: t({
        JP: "マレーシア政府の特別クラス・バイオテクノロジー企業として認定されており、バイオテクノロジー商業化の進歩のための実質的な財政的インセンティブ、税制優遇、制度的サポートへのアクセスを享受しています。",
        EN: "Certified as a special class biotechnology company by the Malaysian government, enjoying access to substantial financial incentives, tax benefits, and institutional support for advancing biotechnology commercialization."
      }),
      image: "/bionexus-DbMz1jYi.jpeg"
    },
    {
      name: "ASEAN",
      subtitle: t({ JP: "東南アジア諸国連合", EN: "Association of Southeast Asian Nations" }),
      description: t({
        JP: "持続可能な水産養殖および農業セクターにおけるパートナーシップからの公式支援により、東南アジア全10カ国にわたる地域に責任を有し、実際的に実行可能な政策とシステムというASEANの共通ビジョンに貢献しています。",
        EN: "With official support from partnerships in sustainable aquaculture and agriculture sectors, responsible for the region spanning all 10 Southeast Asian countries, contributing to ASEAN's shared vision of practical and implementable policies and systems."
      }),
      image: "/ASEAN-uoWrwKNH.jpeg"
    },
    {
      name: "ANGKASA",
      subtitle: t({ JP: "マレーシア政府機関", EN: "Malaysian Government Agency" }),
      description: t({
        JP: "16,000以上の協同組合と730万人の組合員を代表する協同組合開発庁の組合員として、1,596億収益455億を超える価値を有しており、マレーシアの中核経済活動における第一セクターとして重要な技術革新を果たしています。",
        EN: "As a member of the Cooperative Development Agency representing over 16,000 cooperatives and 7.3 million members, with assets exceeding 159.6 billion in revenue and 45.5 billion in value, playing a crucial technological innovation role as a primary sector in Malaysia's core economic activities."
      }),
      image: "/ANGKASA-BAUWowhT.jpeg"
    },
    {
      name: t({ JP: "インベスト・セランゴール", EN: "Invest Selangor" }),
      subtitle: t({ JP: "政府機関", EN: "Government Agency" }),
      description: t({
        JP: "セランゴール州政府が提供する優遇支援エコシステムのメンバーです。このエコシステムには、効率的な行政プロセス、カスタマイズされたインセンティブパッケージ、業界別プログラム、ネットワークやインフラへのアクセスが含まれています。これにより、マレーシアで最も経済的に活発な州の一つで、プロジェクトの成功を促進することを目指しています。",
        EN: "Member of the preferential support ecosystem provided by the Selangor State Government, including efficient administrative processes, customized incentive packages, industry-specific programs, and access to networks and infrastructure, aiming to promote project success in one of Malaysia's most economically active states."
      }),
      image: "/Invest_selangor-BU24U3lB.jpeg"
    },
    {
      name: "NEGERI PAHANG",
      subtitle: t({ JP: "パハン州政府", EN: "Pahang State Government" }),
      description: t({
        JP: "マレーシア、パハン州の投資・産業・科学・技術・イノベーション委員会の委員長（パハン州政府）は、特に収穫量の増加、効率、生産性の向上のための技術と近代的な農業手法の使用を通じて、パハン州の農業セクターの経済発展を強化するMother Vegetableへの提案された投資に対する支援を私たちに与えてくれました。パハン州の投資・産業・科学・技術・イノベーション担当執行委員会は、土地、資本、ネットワークを連携させて、大規模な持続可能な農業イニシアチブを加速させる触媒的な役割を果たしています。このパートナーシップは、民間セクターの投資とマレーシアの国家食料安全保障目標との連携を強化します。",
        EN: "The Chairman of the Investment, Industry, Science, Technology and Innovation Committee of Pahang State, Malaysia has given us support for the proposed investment in Mother Vegetable to enhance economic development of Pahang's agricultural sector, particularly through the use of technology and modern farming methods to increase yields, efficiency and productivity. The Executive Committee plays a catalytic role in accelerating large-scale sustainable agriculture initiatives by coordinating land, capital and networks. This partnership strengthens the alignment between private sector investment and Malaysia's national food security objectives."
      }),
      image: "/Negeri-dJn5D2--.jpeg"
    },
    {
      name: "YTAA",
      subtitle: "Yayasan Tengku Abdul Aziz Sultan Abu Bakar",
      description: t({
        JP: "YTAAは社会影響のチャネルとして機能し、サブスクリプションの負担軽減、教育イニシアチブ、ヘルスケア用プログラムやマイクロファイナンスプロジェクトに直接資金を提供することを保証し、地域的な教育全体保健とサステナビリティにおけるエンジニアリングプロジェクトで協力しています。",
        EN: "YTAA functions as a channel for social impact, ensuring direct funding for subscription burden reduction, educational initiatives, healthcare programs and microfinance projects, collaborating on engineering projects in regional education, holistic health and sustainability."
      }),
      image: "/YTAA.jpeg"
    }
  ]

  const japaneseAuthorities = [
    {
      name: t({
        JP: "食品産業・商品・地域開発省（M-FICoRD）サラワク州",
        EN: "Ministry of Food Industry, Commodity and Regional Development (M-FICoRD) Sarawak"
      }),
      description: t({
        JP: "包括的な技術分析提案：サラワク州パダンアイ貯水池におけるテイラピア育成システム。地域の水資源を活用した持続可能な養殖モデルの確立と地域経済の活性化を目指しています。",
        EN: "Comprehensive technical analysis proposal: Tilapia farming system at Padang Ai Reservoir in Sarawak. Aiming to establish sustainable aquaculture models utilizing regional water resources and revitalize the local economy."
      }),
      image: "/m-ficord.jpeg"
    },
    {
      name: t({ JP: "河津町（日本）", EN: "Kawazu Town (Japan)" }),
      description: t({
        JP: "日本におけるMother Vegetableを核とした包括的な事業提携による海洋産業の振興。",
        EN: "Promotion of marine industry through comprehensive business partnerships centered on Mother Vegetable in Japan."
      }),
      image: "/kawazu-town.jpeg"
    },
    {
      name: t({ JP: "静岡県（日本）", EN: "Shizuoka Prefecture (Japan)" }),
      description: t({
        JP: "海洋産業発展および持続可能技術実装のための包括的な県レベル支援システムを提供しています。",
        EN: "Providing comprehensive prefectural-level support systems for marine industry development and sustainable technology implementation."
      }),
      image: "/shizuoka-prefecture.jpeg"
    },
    {
      name: t({ JP: "東京都板橋区（日本）", EN: "Itabashi Ward, Tokyo (Japan)" }),
      description: t({
        JP: "海洋産業発展および持続可能技術実装のための包括的な県レベル支援システムを提供しています。",
        EN: "Providing comprehensive ward-level support systems for marine industry development and sustainable technology implementation."
      }),
      image: "/itabashi-ward.jpeg"
    },
    {
      name: t({ JP: "水産庁（日本）", EN: "Fisheries Agency (Japan)" }),
      description: t({
        JP: "日本における海洋産業の振興とMother Vegetableの導入支援",
        EN: "Supporting the promotion of marine industry and introduction of Mother Vegetable in Japan"
      }),
      image: "/fisheries-agency.jpeg"
    }
  ]

  const internationalOrganizations = [
    {
      name: t({ JP: "東アジア経済研究所（ERIA）", EN: "Economic Research Institute for ASEAN and East Asia (ERIA)" }),
      description: t({
        JP: "ASEAN持続可能農業に関する地域ガイドライン実施のための実践的行動計画および持続可能な農業食料システムに関する予備調査研究において協力しています。",
        EN: "Collaborating on practical action plans for implementing regional guidelines on ASEAN sustainable agriculture and preliminary research on sustainable agri-food systems."
      }),
      image: "/eria.jpeg"
    },
    {
      name: t({ JP: "日本-ASEAN統合基金", EN: "Japan-ASEAN Integration Fund" }),
      description: t({
        JP: "水産養殖および畜産セクターにおける抗菌剤耐性（AMR）対策としての生物的防除剤（BCA）応用に関する実証プロジェクトへの支援を提供しています。",
        EN: "Providing support for demonstration projects on the application of biological control agents (BCA) as countermeasures against antimicrobial resistance (AMR) in aquaculture and livestock sectors."
      }),
      image: "/jaif.jpeg"
    }
  ]

  const otherPartners = [
    {
      name: t({ JP: "Revoganix（レヴォガニクス）", EN: "Revoganix" }),
      description: t({
        JP: "ASEANパネル企業として認められており、ASEAN持続可能な農業・水産養殖アカデミーの設立や地域のBCA（生物的防除剤）生産イニシアチブなど、ASEANから直接授与された複数の影響力の大きいプロジェクトを任されています。ASEAN以外では、Revoganixはサラワク州のコンサルタントを務め、タイ中央政府の水産養殖セクターと緊密に協力するなど、他の戦略的関与も行っています。この実績のある実績により、RevoganixはMother VegetableプロジェクトでASEANを支援し、提携できることを誇りに思い、地域全体のコミュニティに利益をもたらす農業と水産養殖のための堅牢で持続可能なモデルを構築するために、その専門知識とリーダーシップを貢献しています。",
        EN: "Recognized as an ASEAN panel company, entrusted with multiple high-impact projects directly awarded by ASEAN, including establishing the ASEAN Sustainable Agriculture and Aquaculture Academy and regional BCA production initiatives. Beyond ASEAN, Revoganix serves as a consultant to Sarawak State and works closely with Thailand's central government aquaculture sector. With this proven track record, Revoganix is proud to support and partner with ASEAN in the Mother Vegetable project, contributing its expertise and leadership to build robust and sustainable models for agriculture and aquaculture that benefit communities across the region."
      }),
      image: "/revoganix.jpeg"
    },
    {
      name: t({ JP: "バイオエコノミーコーポレーション", EN: "Bioeconomy Corporation" }),
      description: t({
        JP: "農業廃棄物をクリーンな食品に変えるプロジェクトエンゲージメント。持続可能なバイオエコノミーの推進と廃棄物の有効活用を通じた循環型経済の実現に取り組んでいます。",
        EN: "Project engagement in transforming agricultural waste into clean food. Working towards realizing a circular economy through promoting sustainable bioeconomy and effective utilization of waste."
      }),
      image: "/bioeconomy.jpeg"
    },
    {
      name: t({
        JP: "テマセクポリテクニック・水産養殖イノベーションセンター",
        EN: "Temasek Polytechnic Aquaculture Innovation Centre"
      }),
      description: t({
        JP: "ティラピア飼料における生物的防除剤（BCA）の革新的な応用：オープンポンドタンク水産養殖における成長と耐病性の向上。最新の養殖技術と天然由来の防除剤を組み合わせた革新的な養殖システムの開発を推進しています。",
        EN: "Innovative application of biological control agents (BCA) in tilapia feed: Enhancing growth and disease resistance in open pond tank aquaculture. Promoting the development of innovative aquaculture systems combining cutting-edge farming technology with naturally-derived control agents."
      }),
      image: "/temasek.jpeg"
    },
    {
      name: t({ JP: "Cropabl（マレーシア）", EN: "Cropabl (Malaysia)" }),
      description: t({
        JP: "20年以上にわたって非侵襲的かつ無化学物質の農業に取り組んできたパイオニア的企業であり、食料安全保障と持続可能な農業実践を推進するために政府機関との強力なパートナーシップを築いてきました。確立されたグリーンファーミング技術を活用し、現在はマレーシアのMOTHER VEGETABLEを支援し、モジュール型農業ソリューションの開発に協力しています。この取り組みの一環として、MOTHER VEGETABLEと緊密に連携し、ペラ州タンジョン・マリムにおいて10エーカー規模の旗艦プロジェクトを実施し、食料安全保障と環境保全に関する国家目標に沿った持続可能な食料生産のモデルを創出します",
        EN: "A pioneering company with over 20 years of commitment to non-invasive and chemical-free farming, building strong partnerships with government agencies to promote food security and sustainable agricultural practices. Leveraging established green farming technology, now supporting Malaysia's MOTHER VEGETABLE and collaborating on modular agricultural solutions development. As part of this initiative, working closely with MOTHER VEGETABLE to implement a 10-acre flagship project in Tanjung Malim, Perak, creating a sustainable food production model aligned with national goals for food security and environmental conservation."
      }),
      image: "/cropabl.jpeg"
    },

    {
      name: "Healcom Foundation",
      description: t({
        JP: "MOTHER VEGETABLEの取り組みに賛同し、地域社会に最高品質で健康的かつ持続可能に栽培された食品を届ける可能性を高く評価しています。財団はその広範な会員ネットワークを通じて、認知度向上の推進、生産活動の支援、販売チャネルの強化に積極的に関与します。MOTHER VEGETABLEと提携することで、Healcom Foundationは公衆衛生と栄養改善という自身の使命を推進するだけでなく、地域産の無化学食品の持続可能な市場を創出し、消費者と地域社会全体に利益をもたらします。",
        EN: "Supporting the MOTHER VEGETABLE initiative and highly valuing its potential to deliver the highest quality, healthy, and sustainably grown food to local communities. Through its extensive member network, the foundation actively engages in raising awareness, supporting production activities, and strengthening sales channels. By partnering with MOTHER VEGETABLE, Healcom Foundation not only advances its own mission of public health and nutrition improvement but also creates a sustainable market for locally-produced chemical-free food, benefiting consumers and communities as a whole."
      }),
      image: "/healcom.jpeg"
    },
   {
      name: t({ JP: "黒井漁業協同組合", EN: "Kuroi Fishery Cooperative" }),
      description: t({
        JP: "日本の下関市に位置する漁協組合：磯焼けによる空ウニの大量発生や養殖に対して課題を持っており、MOTHER VEGETABLEを活用することで局所的な磯焼け解決や効率的な養殖を進めている。",
        EN: "Fishery cooperative located in Shimonoseki City, Japan: Facing challenges with mass occurrence of empty sea urchins due to rocky shore denudation and aquaculture, advancing local rocky shore denudation solutions and efficient aquaculture using MOTHER VEGETABLE."
      }),
      image: "/kuroi-fishery-DSW6ddl8.jpeg"
    },
    {
      name: t({ JP: "日本PTA", EN: "Japan PTA" }),
      description: t({
        JP: "日本では、小学生の保護者600万人がPTAに登録されています。保護者と教師の会プロジェクト：全国の選ばれた小学校でオリンピック選手とのイベントを開催し、子供たちがマザーベジタブルを体験し、栄養について学びます。これらのプログラムは、将来の研究者を育成し、学校給食の基準の改善を促すため、PTAから高く評価されています。",
        EN: "In Japan, 6 million parents of elementary school students are registered with the PTA. Parent-Teacher Association Project: Hosting events with Olympic athletes at selected elementary schools nationwide, where children experience Mother Vegetable and learn about nutrition. These programs are highly valued by the PTA for nurturing future researchers and promoting improvements in school meal standards."
      }),
      image: "/pta.jpeg"
    },
    {
      name: "LEON",
      description: t({
        JP: "アパレル雑誌LEONの不動産部門：20年以上の歴史を持つ日本の紳士向けアパレル雑誌で、40代から50代の富裕層をターゲットとし、月間約1,000万ページビューを誇ります。プロジェクト：彼らは日本全国に高級宿泊施設を建設する計画で、そこには家族がマザーベジタブルを体験し、地元の収穫物で作られた食事を楽しめるMother Vegetable施設が併設されます。",
        EN: "Real estate division of apparel magazine LEON: A Japanese men's apparel magazine with over 20 years of history, targeting affluent individuals in their 40s and 50s, boasting approximately 10 million monthly page views. Project: They plan to build luxury accommodation facilities across Japan, featuring Mother Vegetable facilities where families can experience Mother Vegetable and enjoy meals made with local harvests."
      }),
      image: "/leon.jpeg"
    },
    // {
    //   name: t({ JP: "JTB総合研究所", EN: "JTB Research Institute" }),
    //   description: t({
    //     JP: "JTBツーリズムリサーチ＆コンサルティング：日本最大の旅行代理店であり、世界最大級の旅行代理店の1つ。海洋産業の推進とエデングリーン関連製品の事業開発支援のためのパートナーシップ",
    //     EN: "JTB Tourism Research & Consulting: Japan's largest travel agency and one of the world's largest. Partnership for promoting marine industry and supporting business development of Eden Green-related products."
    //   }),
    //   image: "/jtb-logo.svg"
    // },
    {
      name: t({ JP: "九州電工", EN: "Kyushu Denko" }),
      description: t({
        JP: "日本の大手電力会社：藻場（海藻の群落）を造成することで、魚貝類の住処としての機能や水質浄化、さらにはCO₂固定機能を活かした藻場再生の実用化研究に2001年度から取り組んでいます。MOTHER VEGETABLEを活用したバイオマスにより生産性の向上を検討している。",
        EN: "Major Japanese power company: Since 2001, engaged in practical research on seaweed bed restoration utilizing functions as habitat for fish and shellfish, water purification, and CO₂ fixation through creating seaweed beds. Exploring productivity improvements through biomass utilizing MOTHER VEGETABLE."
      }),
      image: "/Kyushudenko.jpeg"
    },
    {
      name: t({ JP: "全国姉妹漁業振興協議会株式会社", EN: "National Sister Fisheries Promotion Council Inc." }),
      description: t({
        JP: "河津町との連携による海洋事業開発とMother Vegetable事業の推進。全国の漁業組合の連絡窓口を実施。",
        EN: "Promoting marine business development and Mother Vegetable business through collaboration with Kawazu Town. Implementing communication channels for fishery associations nationwide."
      }),
      image: "/sfc.jpeg",
      url: "https://www.nsfpcouncil.com/"
    },
    
     // {
     // name: "MO",
     // description: t({
    //    JP: "株式会社MOは、日本にていち早くマザーベジタブルを提供すべく、マーケティング調査、販売企画、改善点等を研究開発し、日本国内での販売戦略をサポートしています。",
     //   EN: "MO Corporation conducts marketing research, sales planning, and R&D for improvements to provide Mother Vegetable early in Japan, supporting domestic sales strategies in Japan."
    //  }),
   //   image: "/mo_logo.png"
    // }
  ]

  const universityPartners = [
    {
      name: t({ JP: "ノッティンガム大学", EN: "University of Nottingham" }),
      description: t({
        JP: "大学構内における3エーカーの施設をMother Vegetable事業に提供する戦略的協力体制を構築し、研究開発の発展のため尊敬されるバイオテクノロジーチームによるサポートを受けています。",
        EN: "Building strategic cooperation by providing a 3-acre facility on campus for Mother Vegetable business, supported by a respected biotechnology team for research and development advancement."
      }),
      image: "/Nottingham-DFhtfkra.jpeg"
    },
    {
      name: t({ JP: "シンガポール国立大学", EN: "National University of Singapore" }),
      description: t({
        JP: "農業や水産養殖、生物的防除剤、製品開発の分野において、科学的専門知識と革新を提供するパートナーシップを結んでいます。私たちの活動の基盤となる科学を強化し、イニシアチブが最先端の研究に基づいていることを確保することが重要です。彼らの支援を受けて、特に私たちの主力プロジェクトであるMother Vegetableプロジェクトを通じて、持続可能なソリューションの開発と商業化を加速することが可能になります。",
        EN: "Forming partnerships that provide scientific expertise and innovation in agriculture, aquaculture, biological control agents, and product development. It is crucial to strengthen the science underlying our activities and ensure initiatives are based on cutting-edge research. With their support, we can accelerate the development and commercialization of sustainable solutions, particularly through our flagship Mother Vegetable project."
      }),
      image: "/NUS-BabuExyP.jpeg"
    },
    {
      name: t({ JP: "マラヤ大学", EN: "University of Malaya" }),
      description: t({
        JP: "マレーシアの最高学府であるマラヤ大学と研究開発分野で連携しています。同大学の優れた学術的知見と科学技術の専門性により、私たちの技術革新が大きく前進しています。この産学連携を通じて、持続可能な発展と社会実装を目指した研究開発を共同で進めており、Mother Vegetableプロジェクトの科学的基盤を強化しています。",
        EN: "Collaborating in research and development with University of Malaya, Malaysia's premier institution. Our technological innovation is significantly advancing through the university's excellent academic insights and scientific expertise. Through this industry-academia collaboration, we are jointly conducting R&D aimed at sustainable development and social implementation, strengthening the scientific foundation of the Mother Vegetable project."
      }),
      image: "/UM-CuopK3W1.jpeg"
    },
    {
      name: t({ JP: "マレーシア科学大学", EN: "Universiti Sains Malaysia" }),
      description: t({
        JP: "微細藻類研究の分野で国際的に高い評価を受けているマレーシア科学大学と共同研究を実施しています。同大学の専門知識と研究施設を活用し、微細藻類の可能性を最大限に引き出す技術開発を進めています。持続可能な社会の実現に向けて、基礎研究から応用開発まで幅広い分野で協力関係を構築しています。",
        EN: "Conducting joint research with Universiti Sains Malaysia, internationally acclaimed in microalgae research. Utilizing the university's expertise and research facilities to advance technology development that maximizes microalgae potential. Building cooperative relationships across broad fields from basic research to applied development toward realizing a sustainable society."
      }),
      image: "/USM-DHEGJzFX.jpeg"
    },
    {
      name: t({ JP: "マレーシア国民大学", EN: "Universiti Kebangsaan Malaysia" }),
      description: t({
        JP: "Mother Vegetableプロジェクトの革新性と持続可能性に高い関心を示していただき、全面的な支援を受けています。現在、大学キャンパス内にMother Vegetable施設を設置する計画が進行中で、教育・研究・社会実装を一体化した新しいモデルの構築を目指しています。科学技術の発展と社会課題の解決に向けて、包括的な産学連携を推進しています。",
        EN: "Showing high interest in the innovation and sustainability of the Mother Vegetable project with full support. Plans are currently underway to establish Mother Vegetable facilities on campus, aiming to build a new model integrating education, research, and social implementation. Promoting comprehensive industry-academia collaboration toward scientific advancement and solving social challenges."
      }),
      image: "/ukm.jpeg"
    },
    {
      name: t({ JP: "マヒドン大学", EN: "Mahidol University" }),
      description: t({
        JP: "タイを代表する研究大学と共同で、家畜飼料における生物的防除剤（BCA）の革新的な応用研究を実施しています。畜産分野における成長促進と疾病耐性向上を目的とした実証実験を進めており、東南アジア地域の畜産業の持続可能な発展に貢献しています。",
        EN: "Conducting innovative applied research on biological control agents (BCA) in livestock feed jointly with Thailand's leading research university. Advancing demonstration experiments aimed at growth promotion and disease resistance improvement in the livestock sector, contributing to sustainable development of Southeast Asian livestock industry."
      }),
      image: "/Mahidol-7ODll9ol.jpeg"
    },
    {
      name: t({ JP: "明治大学", EN: "Meiji University" }),
      description: t({
        JP: "体育会競技者に対してMother Vegetable関連製品を提供するスポンサーシップ協力により、持続可能な栄養ソリューションを通じたスポーツパフォーマンスの支援を実施しています。",
        EN: "Supporting sports performance through sustainable nutrition solutions via sponsorship cooperation providing Mother Vegetable-related products to athletic competitors."
      }),
      image: "/Meiji-C7G7ovOM.jpeg"
    }
  ]

  return (
    <section id="partners" className="py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {t({ JP: 'パートナーシップ', EN: 'Partnerships' })}
          </h2>
        </div>

        {/* Government Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-blue-400 text-center mb-8">
            {t({ JP: '政府・公的機関・地域パートナー', EN: 'Government, Public Institutions & Regional Partners' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {governmentPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-4 drop-shadow-md"
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{partner.name}</h4>
                <p className="text-blue-400 text-sm font-semibold mb-3">{partner.subtitle}</p>
                <p className="text-gray-300 text-xs leading-[1.8]">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* University Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-cyan-400 text-center mb-8">
            {t({ JP: '学術・研究機関', EN: 'Academic & Research Institutions' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universityPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-4 drop-shadow-md"
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{partner.name}</h4>
                {partner.description && (
                  <p className="text-gray-300 text-xs leading-[1.8]">{partner.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Japanese Authorities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-green-400 text-center mb-8">
            {t({ JP: '行政・地方自治体', EN: 'Administration & Local Governments' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {japaneseAuthorities.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center hover:border-green-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-4 drop-shadow-md"
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{partner.name}</h4>
                {partner.description && (
                  <p className="text-gray-300 text-xs leading-[1.8]">{partner.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* International Organizations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-purple-400 text-center mb-8">
            {t({ JP: '国際機関', EN: 'International Organizations' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internationalOrganizations.map((org, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg overflow-hidden">
                  <Image
                    src={org.image}
                    alt={org.name}
                    fill
                    className="object-contain p-4 drop-shadow-md"
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{org.name}</h4>
                <p className="text-gray-300 text-xs leading-[1.8]">{org.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Partners */}
        <div>
          <h3 className="text-2xl font-bold text-orange-400 text-center mb-8">
            {t({ JP: 'その他の提携組織・プロジェクト', EN: 'Other Partner Organizations & Projects' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPartners.map((partner, index) => {
              const CardContent = (
                <>
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg overflow-hidden">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className="object-contain p-4 drop-shadow-md"
                      quality={100}
                      priority
                      sizes="(max-width: 768px) 160px, 160px"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{partner.name}</h4>
                  {(partner as Partner).subtitle && (
                    <p className="text-orange-400 text-sm font-semibold mb-3">{(partner as Partner).subtitle}</p>
                  )}
                  <p className="text-gray-300 text-xs leading-[1.8]">{partner.description}</p>
                </>
              )

              return (partner as Partner).url ? (
                <a
                  key={index}
                  href={(partner as Partner).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all duration-300 hover:scale-105 block cursor-pointer"
                >
                  {CardContent}
                </a>
              ) : (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  {CardContent}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}