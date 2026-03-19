// ============================================================
// Mock Data — Development / Demo
// ============================================================
// API未接続でも画面確認できるように、仮データを定義しています。

import type { Category, PaginatedResponse, Report, Tag } from "@/types/types";

// --- Categories ---
export const MOCK_CATEGORIES: Category[] = [
    { id: "cat-1", name: "社会保障", slug: "social-security", color: "#2563eb" },
    { id: "cat-2", name: "経済政策", slug: "economic-policy", color: "#059669" },
    { id: "cat-3", name: "教育", slug: "education", color: "#d97706" },
    { id: "cat-4", name: "環境", slug: "environment", color: "#16a34a" },
    { id: "cat-5", name: "デジタル", slug: "digital", color: "#7c3aed" },
    { id: "cat-6", name: "外交・安全保障", slug: "diplomacy", color: "#dc2626" },
    { id: "cat-7", name: "地方創生", slug: "regional", color: "#0891b2" },
];

// --- Tags ---
export const MOCK_TAGS: Tag[] = [
    { id: "tag-1", name: "年金", slug: "pension" },
    { id: "tag-2", name: "医療", slug: "healthcare" },
    { id: "tag-3", name: "少子化", slug: "declining-birthrate" },
    { id: "tag-4", name: "DX", slug: "dx" },
    { id: "tag-5", name: "脱炭素", slug: "decarbonization" },
    { id: "tag-6", name: "財政", slug: "finance" },
    { id: "tag-7", name: "雇用", slug: "employment" },
    { id: "tag-8", name: "防衛", slug: "defense" },
    { id: "tag-9", name: "地方創生", slug: "regional-revitalization" },
];

// --- Reports ---
export const MOCK_REPORTS: Report[] = [
    {
        id: "report-9",
        slug: "regional-future-strategy-policy-bank-9",
        title: "地域未来戦略を読み解く ── 投資・産業・生活基盤を一体で進める地方政策",
        description:
            "自民党「政策BANK（地域未来戦略）」の内容をもとに、地方への投資促進、産業クラスター形成、地域交通・生活基盤の再設計までを要点整理。地域ごとの実装論点を俯瞰します。",
        content: `
      <h2>政策の位置づけ</h2>
      <p>「地域未来戦略」は、地方がもつ伸び代を活かし、国民生活の安全と暮らしを守ることを狙いとした政策パッケージです。単発施策ではなく、産業・インフラ・人材・行政運営を横断して実行する設計が特徴です。</p>

      <h2>主要ポイント（政策BANKの整理）</h2>
      <ul>
        <li>地方への大規模投資を呼び込み、地域ごとの産業クラスター形成を戦略的に推進。</li>
        <li>中堅企業の越境展開を支援し、投資促進策とインフラ整備を一体的に実施。</li>
        <li>地域未来投資促進税制の活用拡大、固定資産税減免時の減収補填の拡充を検討。</li>
        <li>工業用水などの産業インフラ強化や産業用地の確保に向け、自治体支援を強化。</li>
        <li>若者・女性を含めて安心して働き暮らせる地方の生活環境整備を推進。</li>
        <li>本社機能分散、地方大学の魅力向上、都市人材と地域企業のマッチングを推進。</li>
        <li>国家戦略特区、スーパーシティ、連携“絆”特区の取組みを加速。</li>
        <li>DX・GX、インフラ老朽化対応、物価高対策を踏まえた地方財源の安定確保を重視。</li>
      </ul>

      <h2>実装フェーズの論点</h2>
      <p>政策の実効性は、自治体がどの産業領域を重点化するか、投資誘導と人材確保をどう同時に回すかに左右されます。自治体間連携やデジタル技術の活用を含め、広域単位での設計・実行力が問われます。</p>

      <h2>現場で見るべきチェック項目</h2>
      <ul>
        <li>地域ごとの重点産業と投資目標の整合性</li>
        <li>税制・補助・インフラ整備の連動性</li>
        <li>若年層・女性を含む定着人材の確保施策</li>
        <li>交通空白対策や生活サービス拠点の実装状況</li>
        <li>自治体DXと広域連携のガバナンス設計</li>
      </ul>

      <blockquote>出典: 自由民主党 重点政策「政策BANK 地域未来戦略」(https://www.jimin.jp/policy/seisaku_bank/9.html)</blockquote>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-7", name: "地方創生", slug: "regional", color: "#0891b2" },
        tags: [
            { id: "tag-9", name: "地方創生", slug: "regional-revitalization" },
            { id: "tag-4", name: "DX", slug: "dx" },
        ],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-02-17T09:00:00.000Z",
        createdAt: "2026-02-17T08:00:00.000Z",
        updatedAt: "2026-02-17T09:00:00.000Z",
    },
    {
        id: "report-1",
        slug: "social-security-reform-2026",
        title: "2026年 社会保障制度改革の全体像 ── 変わる年金・医療・介護の仕組み",
        description:
            "今年度から段階的に施行される社会保障制度改革を、年金・医療・介護の3軸に分けてわかりやすく解説します。現役世代と高齢者世代それぞれへの影響と、私たちが取れる具体的アクションを紹介。",
        content: `
      <h2>改革の背景</h2>
      <p>少子高齢化が進む日本では、社会保障費が年間130兆円を超え、国家予算の約3割を占めるようになりました。持続可能な制度設計が急務とされる中、2026年度から新たな改革が段階的に始まります。</p>
      <h2>年金制度の変更点</h2>
      <p>受給開始年齢の柔軟化が進み、60歳から75歳の間で自由に受給開始時期を選択できるようになりました。繰り下げ受給の場合、月あたりの受給額が0.7%ずつ増加する仕組みは維持されますが、新たに「部分受給」制度が導入されます。</p>
      <blockquote>部分受給制度では、基礎年金と厚生年金をそれぞれ異なるタイミングで受給開始することが可能になります。</blockquote>
      <h2>医療制度の見直し</h2>
      <p>後期高齢者の窓口負担について、所得に応じたきめ細かい段階設定が導入されます。また、マイナ保険証の完全移行に伴い、オンライン診療の保険適用範囲が大幅に拡大されます。</p>
      <h2>介護保険の改正</h2>
      <p>要介護認定のプロセスにAI支援が導入され、申請から認定までの期間が平均30日から14日に短縮される見込みです。同時に、介護職員の処遇改善のための新たな加算制度が設けられます。</p>
      <h2>私たちにできること</h2>
      <ul>
        <li>ねんきんネットで自分の受給見込み額を定期的に確認する</li>
        <li>iDeCoやNISAを活用した自助努力の資産形成を検討する</li>
        <li>地域の介護予防プログラムに積極的に参加する</li>
      </ul>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-1", name: "社会保障", slug: "social-security", color: "#2563eb" },
        tags: [
            { id: "tag-1", name: "年金", slug: "pension" },
            { id: "tag-2", name: "医療", slug: "healthcare" },
        ],
        emphasis: "hero",
        aspectRatio: "16/9",
        publishedAt: "2026-02-10T09:00:00.000Z",
        createdAt: "2026-02-08T12:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z",
    },
    {
        id: "report-2",
        slug: "digital-government-progress",
        title: "デジタル庁3年目の通信簿 ── 行政DXはどこまで進んだか",
        description:
            "行政DXの進捗と、自治体ごとに残る地域差の課題を整理します。",
        content: `
      <h2>デジタル庁のミッション</h2>
      <p>2021年9月に発足したデジタル庁は、「誰一人取り残されないデジタル社会の実現」を掲げ、行政のデジタルトランスフォーメーションを推進してきました。</p>
      <h2>マイナンバーカードの現在地</h2>
      <p>2026年1月時点で、マイナンバーカードの交付率は約83%に達しました。健康保険証との一体化、運転免許証との統合が進む中、利用シーンは着実に広がっています。</p>
      <h2>残された課題</h2>
      <p>一方で、自治体間のシステム標準化は計画より1年以上遅延しており、全1,741市区町村のうち約30%が移行完了していません。高齢者のデジタルリテラシー支援も十分とは言えない状況です。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-5", name: "デジタル", slug: "digital", color: "#7c3aed" },
        tags: [{ id: "tag-4", name: "DX", slug: "dx" }],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-02-05T09:00:00.000Z",
        createdAt: "2026-02-03T12:00:00.000Z",
        updatedAt: "2026-02-05T09:00:00.000Z",
    },
    {
        id: "report-3",
        slug: "education-reform-giga-school",
        title: "GIGAスクール構想の次のフェーズ ── 1人1台端末時代の教育格差",
        description:
            "全国の小中学校にタブレットが行き渡ったGIGAスクール構想。しかし活用度には学校間・地域間で大きな差が。第2フェーズの課題と方向性を探ります。",
        content: `
      <h2>GIGAスクール構想とは</h2>
      <p>2019年に文部科学省が打ち出した「GIGAスクール構想」は、小中学校の児童生徒に1人1台の端末と高速ネットワークを整備するプロジェクトです。コロナ禍で整備が前倒しされ、2021年度中にほぼ全校で端末配布が完了しました。</p>
      <h2>活用格差の実態</h2>
      <p>端末の「配布」は完了しましたが、「活用」には大きな格差があります。先進的な自治体ではAIドリルやプログラミング教育が日常化する一方、端末が机の引き出しに眠ったままの学校も少なくありません。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-3", name: "教育", slug: "education", color: "#d97706" },
        tags: [{ id: "tag-4", name: "DX", slug: "dx" }],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-01-28T09:00:00.000Z",
        createdAt: "2026-01-26T12:00:00.000Z",
        updatedAt: "2026-01-28T09:00:00.000Z",
    },
    {
        id: "report-4",
        slug: "carbon-neutral-2050-roadmap",
        title: "カーボンニュートラル2050 ── 中間見直しで何が変わったか",
        description:
            "2050年カーボンニュートラル宣言から5年。中間見直しで目標と手段がどう修正されたのか、エネルギーミックスの最新見通しとともに解説します。",
        content: `
      <h2>カーボンニュートラル宣言の振り返り</h2>
      <p>2020年10月、当時の菅首相が「2050年カーボンニュートラル」を宣言しました。以降、グリーン成長戦略の策定、GX推進法の成立など、政策の枠組みが急速に整備されてきました。</p>
      <h2>中間見直しのポイント</h2>
      <p>2025年に行われた中間見直しでは、再生可能エネルギーの導入目標が上方修正される一方、原子力発電の位置づけが改めて議論の焦点となりました。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-4", name: "環境", slug: "environment", color: "#16a34a" },
        tags: [{ id: "tag-5", name: "脱炭素", slug: "decarbonization" }],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-01-20T09:00:00.000Z",
        createdAt: "2026-01-18T12:00:00.000Z",
        updatedAt: "2026-01-20T09:00:00.000Z",
    },
    {
        id: "report-5",
        slug: "minimum-wage-1500-yen",
        title: "最低賃金1,500円時代を読む ── 家計・企業・地域経済への影響",
        description:
            "段階的に引き上げが進む最低賃金。1,500円到達時のシミュレーションを基に、家計改善効果と中小企業への影響を多角的に検証します。",
        content: `
      <h2>最低賃金の推移</h2>
      <p>日本の最低賃金は2023年に全国加重平均で1,004円に到達し、その後も毎年着実に引き上げが続いています。政府は2030年代半ばまでに全国加重平均1,500円を目指す方針を示しています。</p>
      <h2>家計への影響</h2>
      <p>最低賃金付近で働くパートタイム労働者にとって、引き上げは直接的な収入増につながります。しかし「年収の壁」との関係で、就業調整が発生する可能性も指摘されています。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-2", name: "経済政策", slug: "economic-policy", color: "#059669" },
        tags: [
            { id: "tag-7", name: "雇用", slug: "employment" },
            { id: "tag-6", name: "財政", slug: "finance" },
        ],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-01-15T09:00:00.000Z",
        createdAt: "2026-01-13T12:00:00.000Z",
        updatedAt: "2026-01-15T09:00:00.000Z",
    },
    {
        id: "report-6",
        slug: "regional-revitalization-success",
        title: "地方創生の「成功モデル」再検証 ── 人口が増えた自治体の共通点",
        description:
            "地方創生開始から10年。人口増加を実現した自治体にはどんな共通パターンがあるのか。移住促進策、産業振興策を比較分析します。",
        content: `
      <h2>地方創生10年の成果</h2>
      <p>2014年に始まった地方創生。第2期「まち・ひと・しごと創生総合戦略」も終了し、これまでの取り組みの総括が行われています。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-7", name: "地方創生", slug: "regional", color: "#0891b2" },
        tags: [],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-01-08T09:00:00.000Z",
        createdAt: "2026-01-06T12:00:00.000Z",
        updatedAt: "2026-01-08T09:00:00.000Z",
    },
    {
        id: "report-7",
        slug: "defense-budget-analysis",
        title: "防衛費GDP比2%の内訳 ── 何にいくら使われているのか",
        description:
            "防衛費の大幅増額が話題になりましたが、具体的な使途は意外と知られていません。装備品、人件費、研究開発の内訳を可視化して解説します。",
        content: `
      <h2>防衛費増額の経緯</h2>
      <p>2022年末に策定された「国家安全保障戦略」に基づき、防衛費はGDP比2%を目標に段階的に増額されています。2027年度にはGDP比2%に到達する計画です。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop",
            width: 1200,
            height: 675,
        },
        category: { id: "cat-6", name: "外交・安全保障", slug: "diplomacy", color: "#dc2626" },
        tags: [
            { id: "tag-8", name: "防衛", slug: "defense" },
            { id: "tag-6", name: "財政", slug: "finance" },
        ],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2026-01-02T09:00:00.000Z",
        createdAt: "2025-12-30T12:00:00.000Z",
        updatedAt: "2026-01-02T09:00:00.000Z",
    },
    {
        id: "report-8",
        slug: "childcare-support-expansion",
        title: "こども未来戦略を読み解く ── 「異次元の少子化対策」の中身と課題",
        description:
            "児童手当の拡充、出産費用の保険適用検討、育児休業給付の引き上げなど、矢継ぎ早に打ち出される少子化対策。全体像と残された論点を整理します。",
        content: `
      <h2>こども未来戦略とは</h2>
      <p>2023年末に閣議決定された「こども未来戦略」は、2024年度からの3年間を集中取組期間と位置づけ、年間3.6兆円規模の少子化関連予算を確保する方針を示しました。</p>
    `,
        eyecatch: {
            url: "https://images.unsplash.com/photo-1587654780014-7043e69fa564?w=800&h=450&fit=crop",
            width: 800,
            height: 450,
        },
        category: { id: "cat-1", name: "社会保障", slug: "social-security", color: "#2563eb" },
        tags: [{ id: "tag-3", name: "少子化", slug: "declining-birthrate" }],
        emphasis: "standard",
        aspectRatio: "16/9",
        publishedAt: "2025-12-25T09:00:00.000Z",
        createdAt: "2025-12-23T12:00:00.000Z",
        updatedAt: "2025-12-25T09:00:00.000Z",
    },
];

// --- Helper Functions ---

export function getMockReports(query?: {
    category?: string;
    tag?: string;
    q?: string;
    page?: number;
    limit?: number;
}): PaginatedResponse<Report> {
    // 元配列を壊さないようにコピーしてから絞り込みます。
    let filtered = [...MOCK_REPORTS];

    // 本文はHTML文字列なので、検索時はタグを除去してテキスト化
    const stripHtml = (html: string): string =>
        html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    if (query?.category) {
        filtered = filtered.filter((r) => r.category.slug === query.category);
    }
    if (query?.tag) {
        filtered = filtered.filter((r) => r.tags.some((t) => t.slug === query.tag));
    }
    if (query?.q) {
        const q = query.q.toLowerCase();
        // タイトル・概要・本文の3箇所を検索対象にする
        filtered = filtered.filter(
            (r) =>
                r.title.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                stripHtml(r.content).toLowerCase().includes(q)
        );
    }

    const limit = query?.limit ?? 10;
    const page = query?.page ?? 1;
    const offset = (page - 1) * limit;
    const contents = filtered.slice(offset, offset + limit);

    return {
        contents,
        totalCount: filtered.length,
        offset,
        limit,
    };
}

export function getMockReportBySlug(slug: string): Report | undefined {
    return MOCK_REPORTS.find((r) => r.slug === slug);
}

export function getMockCategories(): Category[] {
    return MOCK_CATEGORIES;
}
