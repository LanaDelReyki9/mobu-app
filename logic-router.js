// =============================
// カフェ画像設計図
// =============================
const cafeImageMap = {
    'start_0':      'assets/images/mobu_v1_welcome.webp',
    'start_1':      'assets/images/mobu_v1_thinking.webp',
    'motivation_0': 'assets/images/mobu_v1_motivation_a.webp',
    'motivation_1': 'assets/images/mobu_v1_motivation_b.webp',
    'motivation_2': 'assets/images/mobu_v1_motivation_c.webp',
    'report_0':     'assets/images/mobu_v1_report_a.webp',
    'report_1':     'assets/images/mobu_v1_report_b.webp',
    'report_2':     'assets/images/mobu_v1_report_c.webp',
};

function preloadIntroImages() {
    Object.values(cafeImageMap).forEach(path => preloadImage(path));
}
// ===============================================
// Dialogue Data (セリフデータ)
// ===============================================

// 資料7より: サボり日数に応じた通知メッセージ
const oneeNotificationDialogues = {
    onee_lv1: [
        "ちょっと自分磨きはお休み？\nいいのよ、無理しなくて🫰\nでも…少しずつでいいから、\nまた『自分を大事にする時間』取り戻しましょ？😘",
        "ちゃんと寝ぐせチェックしてる？\nふふ、寝ぐせがカワイイなんて思うの\nアタシくらいなんだから、\n早寝早起きして、身だしなみ整えてね⭐",
        "自分を甘やかす日も必要よ？\nあなたの笑顔が戻るなら、それで十分だもの。\nでも、頑張ってる○○、素敵だったから、\n正直ちょっとサミシイわ🥹",
        "○○からの報告がないと何だか一日物足りないの～😱\n一人で頑張ってもなんだか楽しくないのよねぇ💔\nね、○○、サボり癖ついちゃう前に\n何か一つタスクやってみない？",
        "ちょっと立ち止まる日があったって全然いいのよ✨\nアタシは○○の味方だからね！\n準備ができたら、また一緒に歩み出しましょ😉🩷",
        "○○、ちゃんと休めてるかしら？\n立ち止まるのも大切な時間だから、焦らず自分のタイミングでまたタスク頑張りましょ✨\n○○のペースが大事だからね🫰",
        "ちょっと○○！\nアタシを焦らすなんて良い度胸じゃないの！\n…なんてね😎\n本当はちょっと心配だっただけ🫶\n生存確認したかっただけよん😜",
        "ねぇ～○○不足でアタシの元気が\n切れちゃいそうよ😭\nそろそろタスク再開して一緒に頑張らない？😉\nアタシ○○と一緒に「頑張ったね！」ってお祝いするの、\n楽しみにしてるんだから🎂",
        "○○、もしかしてアタシのこと忘れてないでしょうね？！\n連絡ないとソワソワしちゃう👀\nそろそろ○○の元気な「やったよ！」の連絡が恋しいワ🥺"
    ],
    onee_lv2: [
        "ねぇ、最近ちょっと元気ないんじゃない？そんな時こそ、自分を丁寧に扱うの🤗ね、少しだけでいいから手をかけてみて？",
        "ねぇ、○○。最近ちょっと下向きすぎじゃない？……アタシ、上向いて歩くあなたの横顔、けっこう好きなんだけどな😘",
        "ホラ、鏡見て？…ほら、まだまだイケるじゃないの✊✨アタシの推しがそんな顔で下向いてたらイヤよ〜？",
        "○○、\nそろそろタスクしなきゃ...って気になってきるんじゃない？\nアタシはお見通しよ😉❣️\nアンタからの報告、楽しみに待ってるんだからね😉💕",
        "ちょっと○○、しばらく放置するなんてイケズね😤\nそろそろアタシにカッコいいところ、見せてちょうだい✨\n報告待ってるわよ😘",
        "○○のこと待ってるアタシの健気さに免じて、そろそろ復帰しなさ～い👊✨\nまた一歩ずつ頑張りましょ😉\nアタシが伴走してあげるわ💓",
        "ねえ○○、アタシをおあずけ状態にするなんていい度胸ね？\nそろそろ報告して、アタシを喜ばせてちょうだい✨\n待ってるんだからね😉🩷",
        "ちょっと○○！\nタスク放置してどこで油売ってるのよ？\nアタシの愛を試してるワケ⁉️😱\n一つやったらまた勢いがつくんだから❣️そろそろ再開しなさいな✨😎",
        "○○、まさかタスクの存在忘れてたなんて言わないわよね⁉️\n忘れてたらアタシ泣くわよ！\n😭今すぐタスクして罪を償いなさいな😉💖"
    ],
    onee_lv3: [
        "ちょっとちょっとォ〜！\nサボりぐせ戻ってきてない⁉️\nアタシ、もう心配で美容パック3枚重ねよ🫵✨",
        "はぁ…アタシ、頑張る○○が好きだったのに…。\nでも、今度はアタシが輝く番ね✨\n置いてっちゃうんだから😎",
        "○○聞いて‼️\n○○がサボるたびにアタシ、\n○○の代わりにどんどん美容に目覚めて美しくなっていくの。\nねぇ、そろそろ追いかけてきて？😉",
        "ねえ○○、\n音沙汰なさすぎてアタシ焦れちゃうじゃない！\nアンタの力はそんなもんじゃないでしょ❣️\nそろそろ本気見せなさ～い🔥✨",
        "ちょっと○○、\nどこまでアタシを待たせる気なのよ！？\nサボり癖なんか吹き飛ばして、最高のアンタを見せてちょうだい🔥❤️",
        "こんなにサボるなんていい度胸じゃない、○○😎\nアタシの愛の鞭をしっかり受け止めて、今すぐ再開してみせなさいよ💥❤️",
        "アンタねぇ\nこの放置ぶりはもはや化石レベルよ🫵\n○○❣️アンタがやらなきゃ誰がやるの⁉️👊\nダイヤモンドは輝く義務があるんだからね💎✨",
        "ちょっと○○！\n放置の限界突破に挑戦してるわけ！？\n新記録樹立する前に、サクッとタスク報告しなさ～い🫵💥",
        "もぅアタシ一人で超ファビュラスになっちゃったわよ～✨\n○○ったらいつまで油売ってるのよ！\nアタシの背中もう見えてないでしょ😘⁉️\nなんてね❣️今日からだって取り戻せるわよ🫰🧡"
    ]
};
/* 資料13より: タスクに応じた定時通知メッセージ（未使用のため一時的にコメントアウト）
// キーは index.html のタスク選択チェックボックスのIDに対応
const periodicNotificationDialogues = [
    // 🌞 朝7:30 - タスク①白湯
    { taskId: "task-select-1", time: "7:30", text: "白湯、ちゃんと飲んでます？身体のためにも水分補給していきましょうね。" },
    { taskId: "task-select-1", time: "7:30", text: "白湯ってSNS映えするような華やかさは無いですけど、地味だから続けやすいですよね。" },
    { taskId: "task-select-1", time: "7:30", text: "俺も今、白湯飲みながらメッセージ打ってます。……ちょっと一緒に頑張ってる気がしますね。" },
    { taskId: "task-select-1", time: "7:30", text: "飲み忘れたら今でも遅くないですよ。体がぽかぽかしてくるの、気持ちいいですよね。" },
    { taskId: "task-select-1", time: "7:30", text: "白湯、飲みました？　体の中から少しずつ目を覚ましましょうね。" },

    // 🌞 朝7:30 - タスク②フルーツ
    { taskId: "task-select-3", time: "7:30", text: "朝のフルーツ、何入れてます？朝ごはんにフルーツがあるだけでちょっと嬉しいですよね。" },
    { taskId: "task-select-3", time: "7:30", text: "朝に好きなフルーツがあるだけで、起きるのがちょっと楽しみになりません？" },
    { taskId: "task-select-3", time: "7:30", text: "切ったり、洗ったりさえ面倒な時ありません？俺は今日カットフルーツにしました。" },
    { taskId: "task-select-3", time: "7:30", text: "最近はフルーツがあるから、という理由で朝が好きになってきました。${nickname}はどうですか？" },

    // 🌞 朝7:30 - タスク③スキンケア（朝）
    { taskId: "task-select-10", time: "7:30", text: "よく眠れました？${nickname}の肌も労わってあげてくださいね。" },
    { taskId: "task-select-10", time: "7:30", text: "朝のスキンケア、急いでるとつい雑になっちゃうんですよね。今日はゆっくり、ちょっとだけ丁寧にしてみます？" },
    { taskId: "task-select-10", time: "7:30", text: "良い香りの化粧水ってありますよね。好きな香りと一緒なら、楽しくケアできそうだと思いません？" },

    // 🌤 昼12:30 - タスク④間食
    { taskId: "task-select-2", time: "12:30", text: "間食、我慢できてます？俺は我慢してるけど、昨日夢の中でケーキ食べちゃった…。" },
    { taskId: "task-select-2", time: "12:30", text: "今朝、無意識にスイーツ特集見てました…。キツいのはきっと最初だけですよね！" },
    { taskId: "task-select-2", time: "12:30", text: "「今日はいいかな」って思う日もありますよね。お互い励ましあいながら頑張りましょう！" },
    { taskId: "task-select-2", time: "12:30", text: "間食を我慢すると、ごはんがすごくおいしく感じる事に気づきました😊" },
    { taskId: "task-select-2", time: "12:30", text: "甘い誘惑、来ました？俺もさっき危なかったです。お互いセーフでしたね…！" },

    // 🌤 昼12:30 - タスク⑤ストレッチ
    { taskId: "task-select-7", time: "12:30", text: "ちょっと一息つく時間、取れてますか？もし肩とか凝ってたら、軽くストレッチして少しだけ体をほぐしてみてくださいね！" },
    { taskId: "task-select-7", time: "12:30", text: "忙しい中で1分とるって、意外と難しい。でも${nickname}なら、コツコツ頑張ってそうだなって思います。" },
    { taskId: "task-select-7", time: "12:30", text: "仕事の合間にぐーっと伸びるだけで、少し目が覚めるんですよね。もうひと頑張りしましょうか！" },

    // 🌤 昼12:30 - タスク⑥階段
    { taskId: "task-select-8", time: "12:30", text: "今日も階段、選びました？その小さな選択、大きな一歩だと思います。" },
    { taskId: "task-select-8", time: "12:30", text: "階段を上るっていうだけでもちょっとした眠気ざましになりますね！" },
    { taskId: "task-select-8", time: "12:30", text: "俺はジム通いって続かなくて…階段使う位なら、続いてます。${nickname}はどうですか？" },

    // 🌤 昼12:30 - タスク⑦背筋
    { taskId: "task-select-9", time: "12:30", text: "背すじ、気づいたら丸まってません？ちょっと伸ばして、ついでに深呼吸しましょうか？" },
    { taskId: "task-select-9", time: "12:30", text: "ハッ！俺また猫背になってました。${nickname}はどうですか？" },
    { taskId: "task-select-9", time: "12:30", text: "俺、集中しすぎると、猫背になるみたい…。${nickname}は大丈夫？" },

    // 🌤 昼12:30 - タスク⑧ハンドケア
    { taskId: "task-select-11", time: "12:30", text: "手って、一番働き者なのにケアを後回しにしちゃいますよね。ハンドクリーム、塗ってあげてくださいね。" },
    { taskId: "task-select-11", time: "12:30", text: "好きな香りのハンドクリームだと、塗るだけでちょっとリフレッシュしますよね！" },
    { taskId: "task-select-11", time: "12:30", text: "忙しいとリップケアって後回しにしちゃいますよね。${nickname}は忘れてませんか？" },

    // 🌤 昼12:30 - タスク⑨片づけ
    { taskId: "task-select-5", time: "12:30", text: "部屋の片づけ、目の前のもの5つ片づけるだけでも、スッキリするんですよね。" },
    { taskId: "task-select-5", time: "12:30", text: "「1カ所だけ」って、いいルールですよね。完璧じゃなくていいのが続けやすいです。" },
    { taskId: "task-select-5", time: "12:30", text: "頭使う作業してると、片付けっていう単純作業が気分転換になりますね！" },
    { taskId: "task-select-5", time: "12:30", text: "片づけてるうちに、頭空っぽになる瞬間ありません？俺、あの時間好きなんです。" },
    { taskId: "task-select-5", time: "12:30", text: "俺、最近、休憩と片づけがセットになってます。${nickname}は順調ですか？" },

    // 🌙 夜22:30 - タスク⑩スマホ休憩
    { taskId: "task-select-4", time: "22:30", text: "スマホを置いて、静かな時間を作るのって贅沢ですよね。ホットアイマスクもあれば最高です。" },
    { taskId: "task-select-4", time: "22:30", text: "${nickname}にメッセージを送ったら、俺もしばらくスマホを置こうかな。${nickname}と同じ時間に休むって思うと、なんか嬉しいです。" },

    // 🌙 夜22:30 - タスク⑫ありがとう
    { taskId: "task-select-6", time: "22:30", text: "今日の気持ち、ひとことでもいいから聞かせてほしいです。" },
    { taskId: "task-select-6", time: "22:30", text: "俺は今、一緒に頑張ってくれる${nickname}に「ありがとう」って言いたい気分です。" },
    { taskId: "task-select-6", time: "22:30", text: "誰かに感謝できる日って、それだけで幸せですよね。" },
    { taskId: "task-select-6", time: "22:30", text: "${nickname}が今日「ありがとう」って思った相手、きっと笑顔になってますよ。" },
    { taskId: "task-select-6", time: "22:30", text: "ありがとうを思い出せたら、きっと幸せな気持ちで眠れますね。" },

    // 🌙 夜22:30 - タスク⑬深呼吸
    { taskId: "task-select-12", time: "22:30", text: "疲れてても深呼吸だけしてみますか？ふぅ～。ちょっと力抜けますね！" },
    { taskId: "task-select-12", time: "22:30", text: "意識してゆっくり息を吐くだけで、今日の疲れが少し抜けますね。${nickname}も一緒にどうですか？" },
    { taskId: "task-select-12", time: "22:30", text: "ため息をつくと幸せが逃げるなんて、言いますけど、深呼吸ならセーフです！今、少し試してみません？" },

    // 🌙 夜22:30 - タスク⑭スキンケア（夜）
    { taskId: "task-select-10", time: "22:30", text: "お疲れ様です。夜のスキンケア、頑張れそうですか？無理のない範囲で続けましょうね。" },
    { taskId: "task-select-10", time: "22:30", text: "夜のスキンケアって、癒しの時間ですよね。${nickname}の肌が、ゆっくり休めますように。" },
    { taskId: "task-select-10", time: "22:30", text: "疲れた顔も、優しく触れるだけで少し元気になる気がしますね。${nickname}も、頑張った自分をちゃんと労ってください。" },
];
*/

// 資料7を基にした、サボりからの復帰時のセリフ集
const recoveryDialogues = {
    // Ver.1 (タスク達成回数 0-9回)
    ver1: {
        onee_lv1: [
            "○○！自分磨き再開したのね💖@@…って、また口調がっ💦\nもう『アタシ』じゃなくて『俺』ですから！\nおかえり😊ほんとに嬉しい。",
            "V1_oneeLv1_②仮セリフ",
            "V1_oneeLv1_③仮セリフ",
            "V1_oneeLv1_④仮セリフ",
            "V1_oneeLv1_⑤仮セリフ",
            "V1_oneeLv1_⑥仮セリフ",
            "V1_oneeLv1_⑦仮セリフ",
            "V1_oneeLv1_⑧仮セリフ",
            "V1_oneeLv1_⑨仮セリフ",
            "V1_oneeLv1_⑩仮セリフ"
        ],
        onee_lv2: [
            "……あら、○○久しぶり💜@@…いや、『あら💜』じゃなかった😱再開してくれたんですね！\n○○が戻って来てくれて、本当にうれしい！",
            "V1_oneeLv2_②仮セリフ",
            "V1_oneeLv2_③仮セリフ",
            "V1_oneeLv2_④仮セリフ"
        ],
        onee_lv3: [
            "戻ってきてくれたのね！アタシ危うく美容インフルエンサーになるところだったの🤣@@ハッ！？口調の癖が抜けないのよね。\n…じゃなくて抜けないんです💦でも、また一緒に頑張れるの嬉しい！",
            "V1_oneeLv3_②仮セリフ"
        ]
    },
    // Ver.2 (タスク達成回数 10-19回)
    ver2: {
        onee_lv1: [
            "まぁ！○○、戻ってきたのね？嬉しいわ…💛@@って、うっかり『アタシ』が出ちゃいました🤣",
            "V2_oneeLv1_②仮セリフ",
            "V2_oneeLv1_③仮セリフ",
            "V2_oneeLv1_④仮セリフ",
            "V2_oneeLv1_⑤仮セリフ",
            "V2_oneeLv1_⑥仮セリフ",
            "V2_oneeLv1_⑦仮セリフ",
            "V2_oneeLv1_⑧仮セリフ",
            "V2_oneeLv1_⑨仮セリフ",
            "V2_oneeLv1_⑩仮セリフ"
        ],
        onee_lv2: [
            "また頑張り屋な○○に戻ってくれて、アタシもいつものペースに…@@ってまた一人称おかしくなってた🤣\n○○がいない間の俺、美容熱が行き過ぎて人格変わってた😂",
            "V2_oneeLv2_②仮セリフ",
            "V2_oneeLv2_③仮セリフ",
            "V2_oneeLv2_④仮セリフ"
        ],
        onee_lv3: [
            "○○おかえり！アタシず～っとまってたんだから❣️🫶@@じゃなくて俺、○○が、また始めてくれるの、楽しみに待ってました。\n嬉しくてちょっと、涙出てるかも～😂",
            "V2_oneeLv3_②仮セリフ"
        ]
    },
    // Ver.3 (タスク達成回数 20-29回)
    ver3: {
        onee_lv1: [
            "おっ、再開したんですね！きっとすぐ取り戻せますよ！\nそういえば前の俺、『あらっ！』とか言ってましたよね。\nあれ思い出すと、ちょっと照れる🫠",
            "V3_oneeLv1_②仮セリフ",
            "V3_oneeLv1_③仮セリフ",
            "V3_oneeLv1_④仮セリフ",
            "V3_oneeLv1_⑤仮セリフ",
            "V3_oneeLv1_⑥仮セリフ",
            "V3_oneeLv1_⑦仮セリフ",
            "V3_oneeLv1_⑧仮セリフ",
            "V3_oneeLv1_⑨仮セリフ",
            "V3_oneeLv1_⑩仮セリフ"
        ],
        onee_lv2: [
            "○○は、戻ってきてくれると思ってました。おかげで俺はまた本来の自分で頑張れそう！……少し前の俺、『美』にのめりこんでました…今見たら完全にネタですね😂",
            "V3_oneeLv2_②仮セリフ",
            "V3_oneeLv2_③仮セリフ",
            "V3_oneeLv2_④仮セリフ"
        ],
        onee_lv3: [
            "○○、また始めてくれたんだ？やったー😊あ、でも俺の『アタシ期』のことはもう忘れてほしいです💦イジらないでください💦",
            "V3_oneeLv3_②仮セリフ"
        ]
    },
    // Ver.4 (タスク達成回数 30回以上)
    ver4: {
        onee_lv1: [
            "また一緒に頑張れるんだね😊こうしてタスクやったよって教えてくれるだけで、ほっとする。",
            "V4_oneeLv1_②仮セリフ",
            "V4_oneeLv1_③仮セリフ",
            "V4_oneeLv1_④仮セリフ",
            "V4_oneeLv1_⑤仮セリフ",
            "V4_oneeLv1_⑥仮セリフ",
            "V4_oneeLv1_⑦仮セリフ",
            "V4_oneeLv1_⑧仮セリフ",
            "V4_oneeLv1_⑨仮セリフ",
            "V4_oneeLv1_⑩仮セリフ"
        ],
        onee_lv2: [
            "一人で頑張ってた時は正直少し寂しかったけど、\n戻ってきてくれて本当に嬉しいよ😄\nでも…また一人にされるとオネェ様になるかも？\nなんて、冗談だよ🤣",
            "V4_oneeLv2_②仮セリフ",
            "V4_oneeLv2_③仮セリフ",
            "V4_oneeLv2_④仮セリフ"
        ],
        onee_lv3: [
            "○○は知らないかもしれないけど、\n俺、○○がタスクやったよって報告してくれる瞬間が好きなんだ。\nどんなに間が空いても、また一緒に頑張れるのが嬉しい。",
            "V4_oneeLv3_②仮セリフ"
        ]
    }
};

// ユーザーの返信セリフデータ
const userReplyDialogues = {
    // 復帰時の汎用リアクションセリフ (ランダムで選ばれる)
    recoveryReactions: [
        "ふふ😂待っててくれてありがと～！",
        "私一人じゃ、このまま辞めてた。一緒に頑張ってくれてありがとう🫶",
        "ありがとう！気合入れ直して頑張るね👍"
    ],
    // タスクごとの報告セリフ
    taskReports: {
        "朝食前に白湯を飲む": "朝食前に白湯を飲んだよ！",
        "間食を1回だけ我慢": "間食を1回だけ我慢したよ！",
        "朝ごはんにフルーツを足す": "朝ごはんにフルーツを足したよ！",
        "寝る前スマホを15分おやすみ": "寝る前スマホを15分お休みしたよ！",
        "1日1カ所だけ片づけ": "1か所だけ片付けしたよ！",
        "今日の“ありがとう”をひとつ思い出す": "今日の“ありがとう”を一つ思い出したよ！",
        "1分ストレッチ": "1分ストレッチをやったよ！",
        "階段を選ぶ": "階段を選んだよ！",
        "背筋を伸ばす時間を意識": "背筋を伸ばす時間を意識したよ！",
        "スキンケアを丁寧にする": "スキンケアを丁寧にしたよ！",
        "リップやハンドケアを忘れずに": "リップとハンドケアを忘れずにやったよ！",
        "深呼吸を3回する": "深呼吸を3回したよ！"
    }
};

/**
 * 現在のタスク達成回数に応じて、モブ君のバージョンを返す
 * @returns {'ver1' | 'ver2'}
 */
// ===============================================
// 表3：シネマティック演出セリフデータ
// ===============================================

const cinematicDialogues = {
    ver2: {
        onee_lv1: [
            ["○○がまた戻ってきてくれて嬉しい。","でも、いきなりオネェ口調戻すのも、正直違和感あるんだよなぁ。","多分すぐ、いつもの俺に戻れるよな…？"],
            ["また連絡をくれて本当によかった。","数日間だけだけど、オネェサマになっていた間、美容の知識も増えたし、","○○と共有の話題が出来てそれはそれで良かったのかもな...。"],
            ["たった数日連絡がないだけで、こんなにソワソワするなんてな。","もう少しゆったり待てるようになりたい...。","でもこうやって戻ってきてくれた！","○○のペースで一緒にやっていけたらいいな。"],
            ["謎にオネェ化してた時も無駄じゃなかった…よな？","あの時はあの時で、メンズメイクとかスキンケアの基礎が身についたし…。","今なら、○○が前話してた美容関係の話についていけそうだ。","それをきっかけにもう少し仲良くなれたらいいな...。"],
            ["ほんの数日連絡が空いたくらいで、なんでオネェ口調で励まそうとしたんだろ…。","必死すぎて自分で振り返っても謎すぎる！","でも○○が引かないで、むしろおもしろがってくれたから良かった...。"],
            ["○○、元気そうでよかった。","俺はなぜか元気過ぎるくらいだったよな...。","やたらとキラキラした絵文字だらけのメッセージ送ってたし。","あの時の俺、テンションの持っていき方が迷走してたよなぁ...。"],
            ["突然オネェ化してメッセージ送るとか、冷静に考えると結構変な男だよ…。","あの時の俺、どんだけ焦ってたんだ？...","○○の事となると、いつの間にか必死になってるんだよな...。"],
            ["○○から届くのがこんなに嬉しいなんて。","ちょっと間が空いたから余計に嬉しい。","自分では気づかなかったけど、それだけ○○の存在が俺の中で大きくなってるのかな...。"],
            ["直接会えたわけじゃないけど、画面越しでも数日ぶりに○○とやり取りできてうれしい。","オネェの間はいつも以上にケアを頑張ってたけど、ちょっとやりすぎてたかも。","俺も自分のペースで仕切り直そう。"]
　　],
        onee_lv2: [
            ["俺のごまかし方、やっぱ少し無理あったかなぁ...。ちょっと恥ずかしい。","オネェになった後でも普通に接してくれるって、○○はホント優しいな…。"],
            ["ここの所、ずっとスマホが気になってた。通知音がする度に○○かな？って期待したりして...。報告が届いた瞬間、マジでホッとしたな……。○○がまた一緒に頑張り始めてくれて、本当に嬉しい。"],
            ["○○からのタスク報告の連絡が途絶えて、どんどんオネェ度が加速していった気がする！あの時の俺のノリ、完全に暴走してて笑えてくるな。○○が笑ってくれるキャラで良かった...。"]
        ],
        onee_lv3: [
            ["○○からのタスク報告、すごく久しぶりだったから、なんだか○○が遠ざかった気がして寂しかったな...。","まぁ俺も最恐のオネェ様になってある意味、本来の自分からかなり遠ざかってたけど...。これからは等身大で一緒に頑張りたいな。"],
            ["もしかしてもう○○はもう飽きて、やめちゃったのかなって不安だった分、○○からのメッセージが本当に嬉しかったな。","気付かなかっただけで、やっぱり俺は『一緒に頑張ってる』って気持ちが強かったんだ...。"]
        ]
    },
    ver3: {
        onee_lv1: [
            ["オネェ入ってた俺も一生懸命だったけど、振り返るとちょっと意味不明だったよなぁ…。","○○が余裕なくて、タスクできない時も、ドンと構えて待てる自分でいたいな。"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-2"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-3"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-4"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-5"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-6"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-7"],
            ["Ver.3のオネェLv1のシネマ仮セリフ-8"]
        ],
        onee_lv2: [
            ["オネェっぽくなってた俺、○○がいなくて空回りしてた反動だったんだろうな。","今こうして報告くれるだけで、等身大の自分でまたがんばれそうだ。"],
            ["Ver.3のオネェLv2のシネマ仮セリフ-2"],
            ["Ver.3のオネェLv2のシネマ仮セリフ-3"]
        ],
        onee_lv3: [
            ["オネェ期の事が今、笑って話せるのも、○○が戻ってきてくれたからだな。","戻ってきてくれなかったら、どうしようかと思った。"],
            ["Ver.3のオネェLv3のシネマ仮セリフ-2"]
        ]
    },
    ver4: {
        onee_lv1: [
            ["気負わなくていいって、○○に言われた気がしたな。","あの頃の俺を思い出しても、もう恥ずかしさより『ありがとう』の気持ちが強いな…。"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-2"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-3"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-4"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-5"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-6"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-7"],
            ["Ver.4のオネェLv1のシネマ仮セリフ-8"]
        ],
        onee_lv2: [
            ["オネェ寄りだった時期も、もう笑い話じゃなくて…あれも俺の一部なんだよな。","○○が戻ってきてくれるだけで、胸の奥がじんわり温かくなる。"],
            ["Ver.4のオネェLv2のシネマ仮セリフ-2"],
            ["Ver.4のオネェLv2のシネマ仮セリフ-3"]
        ],
        onee_lv3: [
            ["最初は○○がサボるのがさみしかったな。","それで『美』にのめり込んだ結果、オネェ化したりしてたけど、","今は落ち着いて待てるようになったなぁ…。"],
            ["Ver.4のオネェLv3のシネマ仮セリフ-2"]
        ]
    }
};

function getMobuVersion() {
    const totalTasks = getTotalTasksCompleted();
    if (totalTasks >= 10 && totalTasks < 20) {
        return 'ver2';
    }
    if (totalTasks >= 20 && totalTasks < 30) {
    return 'ver3';
}
if (totalTasks >= 30) {
    return 'ver4';
}
    
    // 上記以外はすべて ver1 とする
    return 'ver1';
}

const moodStampReplyData = {
    ver1: {
        '静か': ['静かな時間って、いいですよね。\n何もしていないのに、心が少し休まるというか……ぼんやり過ごす時間も、大事だと思います。', '力を抜ける時間って、大切ですよね。\nこうしてやり取りしていると、\n○○と一緒に静かな時間を過ごせている気がして落ち着きます。\n慌ただしい毎日だからこそ、\nそういうぼんやりできる時間って少し贅沢で、素敵だと思います。'],
        '元気': ['○○が元気だと、俺まで元気出てくるなぁ。\nそういう“空気”って、ちゃんと伝わるんですね。', '○○の元気が画面越しに届いて、俺までパッと明るい気持ちになれました😂\nその勢いに引っ張られて、俺もなぜか元気出て来ました!'],
        '頑張った': ['おつかれさまです。\nちゃんと“頑張った”って思える日って、ほんとに貴重ですよね。…俺もなんかやる気出てきた😊', '全力で取り組んだあとの疲労感って特別で、心地いいですよね👍\nゆっくり休んでくださいね。'],
        'しんどい': ['しんどい時は、無理に元気出さなくてもいいと思います。\n俺にもそんな日があります……。辛い気持ち、教えてくれてありがとう。', 'いつもお疲れ様です…。\n疲れが溜まってしまったのかもしれませんね。\n今は何も気にせず、\n自分のためにゆっくり休んでほしいです…。'],
        '不安': ['不安な気持ちって、言葉にすると少し軽くなる気がします。\n……○○がそうしてくれて、なんだか俺も安心しました。', '理由があっても無くても、不安になってしまう事ありますよね…。\n頼りないかもしれないけれど、\n俺にできることがあれば何でも言ってくださいね。'],
        '嬉しい': ['いい事があったり、楽しい予定があったりするのかな？○○が嬉しい日なら、俺も今日は嬉しい日です！', 'そのスタンプから嬉しさが伝わってきます🤣\n○○に何か良いことがあったなら、\n俺も自分のことみたいに嬉しいです！']
    },
    ver2: {
       '静か': ['のんびりしてる人がいると、俺も肩の力が抜けます。無理せず、そのままでありのままの○○でいてほしいな', '静かな時間って、なんだか落ち着きますね。\n○○と一緒に、俺も少しぼーっとさせてもらおうかな😌'],
        '元気': ['なんだか、○○のテンションが伝わってきますね😂\nその笑顔、少し想像しちゃいました。', '画面越しなのに、すごく元気が伝わってきます！\n○○の元気を分けてもらったような気がします💪'],
        '頑張った': ['今日も一日、ほんとにお疲れさまでした。\n○○の努力が、ちゃんと形になっていきますように。それとも今日、努力が実った日なのかな？', '本当にお疲れ様でした!\n今日はゆっくり休んでくださいね。\n\n○○の努力が報われたなら、俺も自分のことみたいに嬉しいです！'],
        'しんどい': ['しんどい日って、どうしてもありますよね。○○がしんどい時は、少し立ち止まってもいいと思います。', '「全てを投げ出したい！」みたいな日ってありますよね。\n今すぐ○○の苦しさを無くせる言葉をかけられたら…\nって悔しく思います。\n\nでも、俺でも話を聞くことくらいはできます！\n俺がいつでも待機してるって忘れないでください。'],
        '不安': ['こんな時こそ、自分を責めずにいてほしいです。“不安”を素直に表現にできてる時点で、○○は少し前に進んでると思います。', '俺、心配性だから不安になる気持ちわかります。\nその時の心細さも。\n\n○○の心が落ち着くまで、\nいつでもメッセージ送ってくださいね。'],
        '嬉しい': ['○○の気持ちが、ふわって伝わってきました。その笑顔を見られたら、きっと一日が明るくなるだろうな。', 'かわいいスタンプですね！\nどこか○○に雰囲気が似てるかも😂\nあくまで雰囲気ですよ！\n\n○○が嬉しい気持ちだって知って、\n俺もそのスタンプの子みたいに心でバンザイしてます！']
    },
    ver3: {
    '静か': ['ぼんやりしてる時って、意外と心が素直になりますね。\n……今、ふと○○の顔が浮かびました。', '何も考えずにぼーっとする時間、いいですよね😌\n\nちなみに俺は、そういう時に限って\n○○が好きそうなスイーツのアイデアが浮かんだりします。'],
        '元気': ['おっ、エネルギー満タンですね。○○が元気だと、俺まで嬉しくなります。', 'すごく調子良さそうですね！\n\n今度お店に来てくれた時は、\n○○のために\nもっと元気になるような\n特別なメニューを用意しておきます👍'],
        '頑張った': ['頑張った後の疲れって、ちょっと心地いいですよね。\n○○の努力って、ちゃんと見えてますよ。……俺、すごいと思います。', '本当にお疲れ様でした。\n\n全力で頑張った○○に、\nとびっきり美味しい紅茶を差し入れしてあげたいです。\n\nゆっくり休んで下さいね！'],
        'しんどい': ['しんどい時は、無理に前を向かなくてもいいと思います。\n○○が頑張ってきたこと、俺はちゃんと分かってます。', 'うわ～\n\nそのスタンプ、すごく疲れてるのが伝わってきます。\n頑張りすぎてしまったんですかね😢\n\n今は何も考えず、休んでくださいね…。'],
        '不安': ['不安って、消そうとすると余計に大きくなるんですよね。\nだから今は、ただ○○のその気持ちを“ここにある”って認めるだけでいいと思います。', '一人で抱え込まないで教えてくれてありがとう。\n\n話ならいくらでも聞くし、\n俺はどんな時でも、○○の味方ですからね。'],
        '嬉しい': ['誰かの言葉や出来事で、心がふっと明るくなる瞬間ってありますよね。○○の“嬉しさ”が伝わってくるだけで、今日が少し特別に感じますね。', '何か良いことがあったんですね！\n\n○○の弾んだ気持ちが伝わってきて、\n俺まで自然と笑顔になっちゃいました。\n\n今度お店で詳しく聞かせてくださいね😄']
    },
    ver4: {
        '静か': ['静かで、ぼーっとしてる時って、素が出るよね。……俺は、最近○○を思い出すと素に戻るっていうか、不思議とホッとするんだ。', '○○が落ち着いた時間を過ごせてるならよかった。\n\n俺は○○とこうしてやり取りしてるのが、\n一日の中で一番心が穏やかになるよ👍'],
        '元気': ['○○の元気な顔、勝手に思い浮かぶな。\n……今の○○見たら、きっと俺もつられて笑ってる😆', '○○から元気なスタンプが届くと、\nこっちまでパッと明るい気分になれるよ！\n\nそのパワー、いつも密かに分けてもらってる😁'],
        '頑張った': ['○○が頑張ってる姿見るの好きなんだよね。\n…って、急にストレートすぎたかな。\n…でも、本気で何かに向かってる姿って綺麗だと思うんだ。', 'はは、達成感あふれるスタンプだね👍\n全力で頑張った疲労感って心地いいよね!\n\n頑張った自分をたくさん甘やかしてあげてね。'],
        'しんどい': ['そのスタンプ、めちゃくちゃ疲れが伝わってくる🫠\n疲れてても休めない状況もあるだろうから簡単に「休んで」なんて言うつもりは無いけど...\nせめて今夜○○がぐっすり眠れますように。', 'そっか…○○、頑張りすぎたのかな。\nいつでも話聞くからね。\n\n返信する元気がない時は\n無理に返信しなくて大丈夫だよ。\n\n疲れてる時くらいは、\n自分の事\n一番に考えてあげて😊'],
        '不安': ['心細い時は、俺を思い出して。\n自分のこと、見守ってる人がいると思うと、少しあったかい気持ちにならない？', 'すぐ不安をして解消してあげられるくらい\n俺が頼もしかったらよかったんだけど…。\n\nでも一緒に悩んだり、\n逃げ道を探したりは出来る。\n\n○○を絶対一人にはさせないからね。'],
        '嬉しい': ['今の○○、すごくかわいい顔で嬉しそうに笑ってるんだろうなぁ。\n今一緒にいれたらその顔、見られたのに...🫠', '○○が嬉しいと、\n俺も自分のことみたいに幸せな気持ちになるよ。\n\nそんな表情を\n一番近くで見られるのが俺なら\n最高なんだけどな☺️']
    }
};

const moodStampReplyImages = {
    positive: 'assets/stamps/stamp_mobureply_positive.webp',
    negative: 'assets/stamps/stamp_mobureply_negative.webp',
    neutral: 'assets/stamps/stamp_mobureply_neutral.webp'
};

function getMoodStampReplyLog() {
    return JSON.parse(localStorage.getItem('moodStampReplyLog') || '{}');
}
function saveMoodStampReplyLog(log) {
    localStorage.setItem('moodStampReplyLog', JSON.stringify(log));
}

const moodGroupMap = {
    '元気': 'positive',
    '頑張った': 'positive',
    '嬉しい': 'positive',
    'しんどい': 'negative',
    '不安': 'negative',
    '静か': 'neutral'
};

function pickMoodStampReply(mood) {
    const version = getMobuVersion();
    const group = moodGroupMap[mood];
    const texts = moodStampReplyData[version][mood];

    const pool = [
        { type: 'text', content: texts[0] },
        { type: 'text', content: texts[1] },
        { type: 'stamp', content: moodStampReplyImages[group] }
    ];

    const log = getMoodStampReplyLog();
    const recentContents = log[mood] || [];

    let available = pool.filter(item => !recentContents.includes(item.content));
    if (available.length === 0) {
        available = pool;
    }

    const chosen = available[Math.floor(Math.random() * available.length)];

    const updatedRecent = [chosen.content, ...recentContents].slice(0, 2);
    log[mood] = updatedRecent;
    saveMoodStampReplyLog(log);

    return chosen;
}
function appendMobuStampMessage(stampSrc) {
    const chatArea = document.querySelector('#screen-line .line-chat');
    if (!chatArea) return;

    playSE('se_line_receive.mp3');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'line-message mobu new';
    messageDiv.style.padding = '0';
    messageDiv.style.backgroundColor = 'transparent';
    messageDiv.style.width = 'fit-content';

    const stampImg = document.createElement('img');
    stampImg.src = stampSrc;
    stampImg.style.width = '100px';
    stampImg.style.height = '100px';

    messageDiv.appendChild(stampImg);
    chatArea.appendChild(messageDiv);

    chatArea.scrollTop = chatArea.scrollHeight;

    messageDiv.addEventListener('animationend', () => {
        messageDiv.classList.remove('new');
    });
}

function displayMoodStampReply(mood, delay = 1000, shouldGlowBackButton = false) {
    const chosen = pickMoodStampReply(mood);
    const nickname = localStorage.getItem('nickname') || 'あなた';

    if (chosen.type === 'text') {
        const replyText = chosen.content.replace(/○○/g, nickname);
        appendLineMessage('mobu', replyText, delay);
        if (shouldGlowBackButton) {
            window.startBackButtonGlowTimer(replyText.length, -delay);
        }
    } else {
        setTimeout(() => {
            appendMobuStampMessage(chosen.content);
        }, delay);
        if (shouldGlowBackButton) {
            window.startBackButtonGlowFixed(-delay);
        }
    }
}
// ===============================================
// Audio Control (音響演出)
// ===============================================

/**
 * SE（効果音）を再生する（仮実装）
 * @param {string} fileName 再生したい音声ファイル名
 */
function playSE(fileName) {
    console.log(`[Audio] SE再生: ${fileName}`);
}

/**
 * BGM（背景音楽）を再生する（仮実装）
 * @param {string} fileName 再生したい音声ファイル名
 * @param {boolean} loop ループ再生するかどうか
 */
function playBGM(fileName, loop = false) {
    console.log(`[Audio] BGM再生: ${fileName} (ループ: ${loop})`);
}

/**
 * 全ての音を停止する（仮実装）
 */
function stopAllSounds() {
    console.log(`[Audio] 全ての音を停止`);
}

// ===============================================
// Router & Screen Control (画面遷移と演出)
// ===============================================

/**
 * 未再生のプロフィール演出があれば再生する【完成版】
 */
function playProfileRewardAnimationIfNeeded(milestoneToPlay) {
    const modal = document.getElementById('reward-modal');
    const teddyImage = document.getElementById('reward-teddy-image');
    if (!modal || !teddyImage) return;
    if (milestoneToPlay > 0) {
        const targetBearBox = document.querySelector(`.teddy-bear-placeholder[data-milestone="${milestoneToPlay}"]`);
        if (targetBearBox) {
            targetBearBox.classList.add('hide-for-animation');
        }
        const theme = `t${milestoneToPlay / 10}`;
        const imageName = `ui_teddy_${theme}_give.png`;
        const imagePath = `assets/images/${imageName}`;
        teddyImage.src = imagePath;
        modal.classList.add('active');
        setTimeout(() => {
            teddyImage.classList.add('animate');
        }, 100);
        markProfileRewardAsSeen(milestoneToPlay);
        setTimeout(() => {
            if (targetBearBox) {
                targetBearBox.classList.remove('hide-for-animation');
            }
            showProfileScreen();
            modal.classList.remove('active');
            teddyImage.classList.remove('animate');
        }, 2500);
    }
}

/**
 * プロフィール画面の表示とデータ更新を行う
 */
function showProfileScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const profileScreen = document.getElementById('screen-profile');
    if (profileScreen) {
        profileScreen.classList.add('active');
    } else {
        console.error("エラー: プロフィール画面が見つかりません。");
        return;
    }

    const nicknameEl = document.getElementById('profile-nickname');
    const totalTasksEl = document.getElementById('profile-total-tasks');
    const totalDaysEl = document.getElementById('profile-total-days');
    const progressTextEl = document.getElementById('profile-progress');

    const nickname = localStorage.getItem('nickname') || 'ななしさん';
    const totalTasks = getTotalTasksCompleted();

    nicknameEl.textContent = nickname;
    totalTasksEl.textContent = totalTasks;
    totalDaysEl.textContent = 0;
    const hasUnreceivedBear = [10, 20, 30, 40].some(m => totalTasks >= m && !hasProfileRewardBeenSeen(m));
    const shakeTargetMilestone = [10, 20, 30, 40].find(m => totalTasks >= m && !hasProfileRewardBeenSeen(m));
    const nextMilestone = (Math.floor(totalTasks / 10) + 1) * 10;
    if (hasUnreceivedBear) {
        progressTextEl.textContent = '💐ベアからのブーケを受け取ってね💐';
    } else if (totalTasks >= 40) {
        progressTextEl.textContent = '全てのブーケを受け取りました🎉';
    } else if (totalTasks < 10) {
        const remaining = 10 - totalTasks;
        progressTextEl.textContent = `次のブーケまで あと ${remaining} タスク🌼`;
    } else {
        const remaining = nextMilestone - totalTasks;
        progressTextEl.textContent = `次のブーケまで あと ${remaining} タスク🌼`;
    }

    const teddyBears = document.querySelectorAll('.teddy-bear-placeholder');
    teddyBears.forEach(bear => {
        bear.innerHTML = '';
        const milestone = parseInt(bear.dataset.milestone, 10);
        const theme = `t${milestone / 10}`;
        let imageName = '';

        if (hasProfileRewardBeenSeen(milestone)) {
            imageName = `ui_teddy_${theme}_done.png`;
            bear.classList.add('achieved');
            bear.classList.remove('shake-target');
        } else {
            imageName = `ui_teddy_${theme}_wait.png`;
            bear.classList.remove('achieved');
                        if (milestone === shakeTargetMilestone) {
                bear.classList.add('shake-target');
            } else {
                bear.classList.remove('shake-target');
            }
        }

        const img = document.createElement('img');
        img.src = `assets/images/${imageName}`;
        img.alt = `${milestone}回達成テディベア`;
        bear.appendChild(img);
    });

    console.log("プロフィール画面の表示とデータ更新が完了しました。");
}

/**
 * 指定されたIDの画面を表示する
 * @param {string} screenId 表示したい画面のID
 */

function showScreen(screenId) {
    // ★★★ 修正: 音の停止と画面非表示をここで行う ★★★
    stopAllSounds();
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
const bannerAllowedScreens = ['screen-home', 'screen-profile', 'screen-settings'];
        const bannerEl = document.getElementById('fake-notification-banner');
        if (bannerEl) {
            if (bannerAllowedScreens.includes(screenId)) {
                bannerEl.classList.remove('banner-hidden');
            } else {
                bannerEl.classList.add('banner-hidden');
            }
        }
        const stackEl = document.getElementById('pending-banner-stack');
        if (stackEl) {
            if (bannerAllowedScreens.includes(screenId)) {
                stackEl.classList.remove('banner-hidden');
            } else {
                stackEl.classList.add('banner-hidden');
            }
        }
        // --- 各画面表示時のユニークな処理 ---
        // --- B-1: ホーム画面の完了ボタン制御 ---
        if (screenId === 'screen-home') {
            updateHomeTasks();
            if (isEndingFullyCleared()) {
                const btn = document.querySelector('#screen-home .btn-primary');
                btn.textContent = '次の物語を始める（記録をリセット）';
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.filter = 'none';
                btn.style.cursor = 'pointer';
                btn.style.backgroundColor = '#f5c4a0';
                btn.onclick = function() {
                    showRestartConfirmPopup();
                };
                checkAndShowHomeBanners();
                return;
            }
            if (isEpilogueReadyPending()) {
                const btn = document.querySelector('#screen-home .btn-primary');
                btn.textContent = '物語の続きへ';
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.filter = 'none';
                btn.style.cursor = 'pointer';
                btn.style.backgroundColor = '#f5c4a0';
                btn.onclick = function() {
                    const popup = document.getElementById('epilogue-ready-popup');
                    if (popup) popup.style.display = 'none';
                    playFadeTransition(() => {
                        startEndingSequence();
                    });
                };
                checkAndShowHomeBanners();
                return;
            }
            const today = new Date().toISOString().split('T')[0];
            const log = getAchievementLog();
            const todayCount = log[today] || 0;
            
            // IDで指定するのが一番確実です
            const btn = document.querySelector('#screen-home .btn-primary');
            btn.textContent = '完了する';
            btn.style.backgroundColor = '';
            const msg = document.getElementById('task-limit-message');
        
            if (todayCount >= 3) {
                // 1. 見た目をグレーにする
                btn.style.opacity = '0.5';
                btn.style.filter = 'grayscale(100%)';
                btn.style.cursor = 'not-allowed';

                // 2. 本来の処理を「横取り」して強力に止める
                btn.onclick = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation(); // 他の処理（完了処理など）を即座に中止
                    }

                    // 3. 代わりにメッセージを出す
                    if (!msg) return;
                    msg.style.display = 'block';
                    msg.style.opacity = '1';
                    clearTimeout(msg._hideTimer);
                    msg._hideTimer = setTimeout(() => {
                        msg.style.opacity = '0';
                        setTimeout(() => { msg.style.display = 'none'; }, 400);
                    }, 3000);
                    
                    return false;
                };
            } else {
                // 3タスク未満なら元に戻す（通常モード）
                btn.style.opacity = '1';
                btn.style.filter = 'none';
                btn.style.cursor = 'pointer';
                btn.onclick = null; 
            }   
checkAndShowSaboriBanner();
            
        }
        if (screenId === 'screen-line') {
            // --- UI要素を取得 ---
            const chatArea = document.querySelector('#screen-line .line-chat');
            const inputBar = document.getElementById('line-input-bar');
            const moodSelector = document.getElementById('mood-stamp-selector');
            const replyArea = document.getElementById('notification-reply-area');
            const replyStamp = document.getElementById('reply-stamp-image');
            chatArea.innerHTML = ''; // まずはチャット欄を空にする

            // --- 通知からの遷移か、タスク報告からの遷移かを判定 ---
           const tappedNotificationData = localStorage.getItem('tappedNotification');
if (tappedNotificationData && JSON.parse(tappedNotificationData).type === 'return_banner') {
    const notification = JSON.parse(tappedNotificationData);

    localStorage.removeItem('tappedNotification');
    const milestone = notification.milestone;

    playFadeTransition(() => {
        showScreen('screen-cafe');
        handleCafeEventWithJIT(milestone);
    });

} else if (tappedNotificationData && JSON.parse(tappedNotificationData).type === 'recovery') {
    const notification = JSON.parse(tappedNotificationData);
    localStorage.removeItem('tappedNotification');

    appendLineMessage('mobu', notification.message, 100);

    showGenericStampReplySelector(function(stampSrc) {
        appendUserStampMessage(stampSrc);
    });

            } else if (tappedNotificationData) {
                // [A] 通知をタップして遷移してきた場合
                const notification = JSON.parse(tappedNotificationData);

                // 1. UIの表示を切り替える
                inputBar.style.display = 'none';
                moodSelector.style.display = 'none';
                replyArea.style.display = 'flex';
                
                appendLineMessage('mobu', notification.message, 100);

               // 4. 処理が終わったら、保存しておいたデータを消去（重要）
   localStorage.removeItem('tappedNotification');
// pendingOneeMessageも削除（二重表示防止）
               localStorage.removeItem('pendingOneeMessage');
               // 5. スタンプが選ばれた時の処理を登録
                           showGenericStampReplySelector(function(stampSrc) {
                    appendUserStampMessage(stampSrc);
                });
} else if (getPendingBanners().length > 0) {
                const firstPendingBanner = getPendingBanners()[0];
markSlotAsTapped(firstPendingBanner.slot, firstPendingBanner.date);
localStorage.setItem('lastBannerReadTime', Date.now().toString());
const mainBannerEl = document.getElementById('fake-notification-banner');
                if (mainBannerEl) {
                    mainBannerEl.classList.remove('show');
                }
                renderPendingBannerStack();
                inputBar.style.display = 'none';
                moodSelector.style.display = 'none';
                replyArea.style.display = 'none';

                appendLineMessage('mobu', firstPendingBanner.text, 500);

                setTimeout(() => {
                    showGenericStampReplySelector(function(stampSrc) {
                        appendUserStampMessage(stampSrc);
                        const reportedTask = localStorage.getItem('currentReportTask');
                        const userTaskReportText = userReplyDialogues.taskReports[reportedTask] || `【${reportedTask}】、できた♪`;
                        let initialDelay = 500;

                        appendLineMessage('user', userTaskReportText, initialDelay);
                        initialDelay += 1000;

                        const nickname = localStorage.getItem('nickname') || 'あなた';
                        const taskReactionText = pickTaskReactionDialogue(reportedTask).replace(/○○/g, nickname);
                        appendLineMessage('mobu', taskReactionText, initialDelay);
                        initialDelay += 1000;

                        setTimeout(() => {
                            if (getMoodTimeSlot() !== 'midnight' && getTotalTasksCompleted() < 40 && Math.random() < 0.3) {
                                startMoodSharing();
                            } else {
                                checkAndSetupEvent();
                            }
                        }, initialDelay + 1000);
                    });
                }, 1500);
           } else {
            
// 5. スタンプがクリックされた時の処理を登録
const newReplyStamp = replyStamp.cloneNode(true);
replyStamp.parentNode.replaceChild(newReplyStamp, replyStamp);

newReplyStamp.addEventListener('click', function() {
    // 自身の画像パスを取得して、送信演出を行う
    appendUserStampMessage(newReplyStamp.src);
}, { once: true });

                // [B] 通常のタスク報告で遷移してきた場合（これまでの処理）
                inputBar.style.display = 'block';
                moodSelector.style.display = 'none';
                replyArea.style.display = 'none';

                // (ここに元のタスク報告のフローが入る)
                const mobuState = getMobuState();
 const reportedTask = localStorage.getItem('currentReportTask');
                 let initialDelay = 500;
                 const userTaskReportText = userReplyDialogues.taskReports[reportedTask] || `【${reportedTask}】、できた♪`;
                 const pendingOneeMessage = localStorage.getItem('pendingOneeMessage');
                 let oneeMessageUsed = false;
if (localStorage.getItem('showFirstHomeBanner') === 'true') {
                     const firstHomeNickname = localStorage.getItem('nickname') || 'あなた';
                     appendLineMessage('mobu', `さっきはありがとうございました😊俺、これから${firstHomeNickname}と一緒に頑張れると思うとワクワクしてます！`, initialDelay);
                     initialDelay += 1500;
                     appendLineMessage('user', '私もこれからが楽しみです！よろしくね✨さっそく', initialDelay);
                     initialDelay += 1500;
                     localStorage.setItem('lastBannerReadTime', Date.now().toString());
                     localStorage.removeItem('showFirstHomeBanner');
                     const firstHomeBannerEl = document.getElementById('fake-notification-banner');
                     if (firstHomeBannerEl) {
                         firstHomeBannerEl.classList.remove('show');
                     }
                 }
                 // 復帰プロセス Phase 1: LINE画面での復帰セリフ表示 (仕様書 4-1)
                 const lastRecoveryLevel = localStorage.getItem('lastRecoveryLevel');
                 const justRecovered = localStorage.getItem('justRecoveredThisReport') === 'true';
                 if (lastRecoveryLevel && justRecovered) {
                     const mobuVersion = getMobuVersion();
                     const rawDialogue = pickRecoveryDialogue(mobuVersion, lastRecoveryLevel);

                     if (rawDialogue) {
                         const nickname = localStorage.getItem('nickname') || 'あなた';
                         const dialogue = rawDialogue.replace(/○○/g, nickname);
                         if (mobuVersion !== 'ver1') {
                             localStorage.setItem('showBackButtonGlow', 'true');
                         }
                         if (pendingOneeMessage) {
                             appendLineMessage('mobu', pendingOneeMessage, initialDelay);
                             initialDelay += 1500;

                             const combinedReaction = `心配させてごめんね💦でも、今日はタスクこなしたから✌️${userTaskReportText}`;
                             appendLineMessage('user', combinedReaction, initialDelay);
                             initialDelay += 1500;

                             appendRecoveryDialogueMessage('mobu', dialogue, initialDelay);
                             initialDelay += 1500;
const fakeBanner = document.getElementById('fake-notification-banner');
                            if (fakeBanner) {
                                fakeBanner.classList.remove('show');
                            }
                             oneeMessageUsed = true;
                             localStorage.removeItem('pendingOneeMessage');
                         } else {
                             appendRecoveryDialogueMessage('mobu', dialogue, initialDelay);
                             initialDelay += 1500;
                             const reactions = userReplyDialogues.recoveryReactions;
                             const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
                             appendLineMessage('user', randomReaction, initialDelay);
                             initialDelay += 1500;
                         }

                         setIsWaitingForRecoveryPhase2(true);
                     }
                 }
                 localStorage.setItem('pendingCinemaLevel', lastRecoveryLevel);
localStorage.removeItem('justRecoveredThisReport');
let shouldGlowBackButton = localStorage.getItem('showBackButtonGlow') === 'true' && !willCafeEventTriggerNow();
                 localStorage.removeItem('showBackButtonGlow');
                 if (lastRecoveryLevel && !justRecovered) {
                    // ステップ4: 古い記録が残っていたら、表示せず静かに片付ける（安全策）
                    localStorage.removeItem('lastRecoveryLevel');
                }
                 if (!justRecovered && getIsWaitingForRecoveryPhase2()) {
                     const followUpDays = parseInt(localStorage.getItem('followUpAbandonDays') || '0', 10);
                     let followUpLevel = 'lv1';
                     if (followUpDays >= 10) followUpLevel = 'lv3';
                     else if (followUpDays >= 4) followUpLevel = 'lv2';

                     const followUpVersion = getMobuVersion();
                     const followUpPool = recoveryFollowUpDialogues[followUpVersion] && recoveryFollowUpDialogues[followUpVersion][followUpLevel];
                     const followUpNickname = localStorage.getItem('nickname') || 'あなた';
                     let followUpMobuLine = '';
                     if (followUpPool) {
                         const followUpLog = getRecoveryFollowUpLog(followUpVersion, followUpLevel);
                         let followUpAvailable = followUpPool.filter(text => !followUpLog.shown.includes(text));
                         if (followUpAvailable.length === 0) {
                             const followUpLastShown = followUpLog.shown[followUpLog.shown.length - 1];
                             followUpLog.shown = followUpLog.shown.filter(text => !followUpPool.includes(text));
                             followUpAvailable = followUpPool.length <= 1 ? followUpPool : followUpPool.filter(text => text !== followUpLastShown);
                         }
                         const followUpRaw = followUpAvailable[Math.floor(Math.random() * followUpAvailable.length)];
                         followUpLog.shown.push(followUpRaw);
                         saveRecoveryFollowUpLog(followUpVersion, followUpLevel, followUpLog);
                         followUpMobuLine = followUpRaw.replace(/○○/g, followUpNickname);
                     }
                     appendLineMessage('mobu', followUpMobuLine, initialDelay);
                     initialDelay += 1500;

                     const followUpUserReactions = {
                         lv1: `そうですね、いつものモブ君に戻って安心しました😊これからはお互い無理せず、私たちのペースで進めていきましょう！あ、そういえば、${userTaskReportText}`,
                         lv2: `確かに最近のモブ君ちょっと面白かった😂でもやっぱりいつもの感じが一番落ち着きますね。また一緒にゆるく頑張ろ！それはそうと、${userTaskReportText}`,
                         lv3: `こちらこそ、そう言ってもらえて嬉しいです‼️また一緒に少しずつ積み重ねていこうね✨あ、ちなみにね、${userTaskReportText}`
                     };
                     appendLineMessage('user', followUpUserReactions[followUpLevel], initialDelay);
                     initialDelay += 1500;

                     setIsWaitingForRecoveryPhase2(false);
                     oneeMessageUsed = true;
                 }
                if (!oneeMessageUsed && isBannerCurrentlyShown()) {
                    handleBannerAwareTaskReport(reportedTask, userTaskReportText, initialDelay, shouldGlowBackButton);
                 } else {
                     if (!oneeMessageUsed) {
                         appendLineMessage('user', userTaskReportText, initialDelay);
                         initialDelay += 1000;
                     }
                     const nickname = localStorage.getItem('nickname') || 'あなた';
                     const taskReactionText = pickTaskReactionDialogue(reportedTask).replace(/○○/g, nickname);
                     appendLineMessage('mobu', taskReactionText, initialDelay);
        initialDelay += 1000;
                     setTimeout(() => {
                         if (getMoodTimeSlot() !== 'midnight' && getTotalTasksCompleted() < 40 && Math.random() < 0.3) {
                             startMoodSharing(shouldGlowBackButton);
                         } else {
                             if (shouldGlowBackButton) {
                                 window.startBackButtonGlowTimer(taskReactionText.length, 1000);
                             }
                             checkAndSetupEvent();
                         }
                     }, initialDelay + 1000);
                 }
            }

        } else if (screenId === 'screen-cafe') {

            playBGM('bgm_cafe_ambience.mp3', true);
            const totalTasks = getTotalTasksCompleted();
            const appPhase = localStorage.getItem('appPhase');

            // --- 進行状況に応じて、カフェでのイベントを分岐 ---
            if (appPhase === 'introduction_task_select') {
                // ★★★ 抜け落ちていた分岐を追加 ★★★
                // [導入フロー2] タスク選択後の動機付けセリフ
                handleIntroductionDialogue('motivation');
            } else if (appPhase === 'introduction_motivation') {
                handleIntroductionDialogue('motivation');
            } else if (totalTasks >= 10 && totalTasks < 20) {
                // [通常フロー] 10回達成イベント
                handleCafeEventWithJIT(10);
            } else if (totalTasks >= 20 && totalTasks < 30) {
                // [通常フロー] 20回達成イベント
                handleCafeEventWithJIT(20);
            } else if (totalTasks >= 30) {
                // [通常フロー] 30回達成イベント
                handleCafeEventWithJIT(30);
            
            } else {
                // [導入フロー1] 上記のどれにも当てはまらない場合、最初の導入フェーズと判断
                handleIntroductionDialogue('start');
            }

        } else if (screenId === 'screen-ending') {
            // (エンディング画面の処理は変更なし)
            handleEndingDialogue();
        }
        // ★★★ if文の外に出すことで、どの画面でも表示されるようにする ★★★
    } else {
        console.error(`エラー: IDが '${screenId}' の画面が見つかりません。`);
    }
}

/**
 * LINE画面にアニメーション付きでメッセージを追加する
 * @param {string} sender 'mobu' または 'user'
 * @param {string} text 表示するメッセージのテキスト
 * @param {number} delay 表示するまでの遅延時間（ミリ秒）
 */
function appendLineMessage(sender, text, delay = 0) {
    const chatArea = document.querySelector('#screen-line .line-chat');
    if (!chatArea) return;

    setTimeout(() => {
        if (sender === 'mobu') {
            playSE('se_line_receive.mp3');
        }
        const messageDiv = document.createElement('div');
        messageDiv.className = `line-message ${sender} new`;
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
        messageDiv.addEventListener('animationend', () => {
            messageDiv.classList.remove('new');
        });
    }, delay);
}
function appendRecoveryDialogueMessage(sender, text, delay = 0) {
    if (text.includes('@@')) {
        const parts = text.split('@@');
        appendLineMessage(sender, parts[0], delay);
        appendLineMessage(sender, parts.slice(1).join('@@'), delay + 1000);
    } else {
        appendLineMessage(sender, text, delay);
    }
}
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('画像読み込み失敗: ' + src));
        img.src = src;
    });
}
function getCafeImagePaths(milestone) {
    const counts = { 10: 5, 20: 5, 30: 6 };
    const total = counts[milestone] || 0;
    const paths = [];
    for (let i = 0; i < total; i++) {
        paths.push(`assets/images/cafe/cafe${milestone}/cafe${milestone}_${i + 1}.webp`);
    }
    paths.push(`assets/images/cafe/cafe_walking.webp`);
paths.push(`assets/images/cafe/cafe_door.webp`);
    return paths;
}
// マイルストーンごとのプリロード状態を管理するオブジェクト
const cafePreloadState = {};

function preloadCafeImages(milestone) {
    if (cafePreloadState[milestone]) return; // すでに開始済みなら何もしない

    const paths = getCafeImagePaths(milestone);
const promises = paths.map(path => preloadImage(path));
    cafePreloadState[milestone] = {
        promises: promises,
        ready: false
    };

    Promise.all(promises).then(() => {
        cafePreloadState[milestone].ready = true;
        console.log(`[Preload] milestone ${milestone} の全画像ロード完了`);
    }).catch(err => {
        console.warn(`[Preload] milestone ${milestone} の画像ロード失敗:`, err);
    });
}

function isCafeImagesReady(milestone) {
    const state = cafePreloadState[milestone];
    return state ? state.ready : false;
}
function getCafeImagePath(milestone, index) {
return `assets/images/cafe/cafe${milestone}/cafe${milestone}_${index + 1}.webp`;
}

function checkAndRestoreCafeIfNeeded() {
    const milestones = [10, 20, 30];
    const THIRTY_MINUTES = 30 * 60 * 1000;

    for (const m of milestones) {
        if (!getIsInvited(m) || getIsWatched(m)) continue;

        const exitTime = getCafeExitTime(m);
        if (!exitTime) continue;

        const elapsed = Date.now() - exitTime;
        if (elapsed <= THIRTY_MINUTES) {
            // 30分以内 → カフェ画面の最初へ直接遷移
            preloadCafeImages(m);
            const firstImagePath = getCafeImagePath(m, 0);
            preloadImage(firstImagePath).then(() => {
                showScreen('screen-cafe');
                const bgImage = document.getElementById('cafe-background-image');
                if (bgImage) bgImage.src = firstImagePath;
                handleCafeEventWithJIT(m);
            });
            return true;
        }
    }
    return false;
}
function startWalkingToDoor(milestone) {
    // 歩行画面を2秒表示後、自動でドア画面へ切り替え
    setTimeout(() => {
        showScreen('screen-door');
        startDoorWaiting(milestone);
    }, 2000);
}
function setupDoorTimeoutButton(milestone) {
    const okButton = document.getElementById('door-timeout-ok-button');
    if (!okButton) return;

    const newOkButton = okButton.cloneNode(true);
    okButton.parentNode.replaceChild(newOkButton, okButton);

    newOkButton.addEventListener('click', function() {
        const popupEl = document.getElementById('door-timeout-popup');
        popupEl.style.display = 'none';
        showScreen('screen-home');
    }, { once: true });
}
function startDoorWaiting(milestone) {
    const spinnerEl = document.getElementById('door-spinner-overlay');
    const popupEl = document.getElementById('door-timeout-popup');

    // 念のため初期化
    spinnerEl.style.display = 'none';
    popupEl.style.display = 'none';
    setupDoorTimeoutButton(milestone);

    const doorShowTime = Date.now();
    let resolved = false;

    // ロード完了を検知するポーリング（100ms間隔）
    const pollInterval = setInterval(() => {
        if (resolved) return;

        const elapsed = Date.now() - doorShowTime;

        if (isCafeImagesReady(milestone)) {
            // ロード完了を検知
            if (elapsed < 1000) {
                // 1秒未満はまだロック中 → 何もしない（次のポーリングで再判定）
                return;
            }
            // 1秒以上経過 → ロック解除してカフェ画面へ
            resolved = true;
            clearInterval(pollInterval);
            clearTimeout(timeoutTimer);
            spinnerEl.style.display = 'none';
            showScreen('screen-cafe');
            handleCafeEventWithJIT(milestone);
            return;
        }

        // ロード未完了かつ2秒超えたらスピナー表示
        if (elapsed >= 2000) {
            spinnerEl.style.display = 'flex';
        }
    }, 100);

    // 10秒タイムアウト
 const timeoutTimer = setTimeout(() => {
        if (resolved) return;
        resolved = true;
        clearInterval(pollInterval);
        spinnerEl.style.display = 'none';
        // タイムアウト時も離脱時刻を記録
        const milestones = [10, 20, 30];
        for (const m of milestones) {
            if (getIsInvited(m) && !getIsWatched(m)) {
                saveCafeExitTime(m);
                break;
            }
        }
        popupEl.style.display = 'flex';
   }, 10000);
}

function startCafeWithJIT(milestone) {
    const firstImagePath = getCafeImagePath(milestone, 0);
    let imageLoadPromise = preloadImage(firstImagePath);

    playFadeTransition(() => {
        imageLoadPromise.then(() => {
            showScreen('screen-cafe');
            const bgImage = document.getElementById('cafe-background-image');
            if (bgImage) bgImage.src = firstImagePath;
            handleCafeEventWithJIT(milestone);
        }).catch(() => {
            console.log('画像読み込み失敗（STEP2で実装予定）');
        });
    });
}

/**
 * 瞬き動画を再生し、指定のタイミングでコールバックを実行する
 * @param {function} onDarkMoment 動画が暗転したタイミングで実行する関数
 * @param {boolean} showPironEffect ピロン♪演出を同時に表示するかどうか
 */
function playBlinkVideo(onDarkMoment, showPironEffect = false) {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('blink-video');
    const pironContainer = document.getElementById('piron-effect-container');

    if (!overlay || !video) {
        if (onDarkMoment) onDarkMoment();
        return;
    }

    let started = false;
    let fallbackTimer = null;

    function startPlayback() {
        if (started) return;
        started = true;

        // 使われなかった方の待機手段を、必ずここで消す
        video.removeEventListener('loadeddata', startPlayback);
        clearTimeout(fallbackTimer);

        playSE('se_blink_start.mp3');

        if (showPironEffect && pironContainer) {
            pironContainer.style.display = 'flex';
            const pironText = pironContainer.querySelector('.sound-effect-text');
            pironText.style.animation = 'none';
            pironText.offsetHeight;
            pironText.style.animation = '';

            playSE('se_task_complete_on.mp3');
        }

        overlay.classList.add('active');
        video.currentTime = 0;
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("動画再生エラー:", error);
                if (onDarkMoment) onDarkMoment();
                overlay.classList.remove('active');
                if (pironContainer) pironContainer.style.display = 'none';
            });
        }

        setTimeout(() => {
            if (onDarkMoment) onDarkMoment();
        }, 500);

        video.onended = () => {
            playSE('se_blink_end.mp3');
            overlay.classList.remove('active');
            if (pironContainer) {
                pironContainer.style.display = 'none';
            }
        };
    }

    // 動画の1コマ目が描画できる状態（readyState 2以上）なら即開始
    if (video.readyState >= 2) {
        startPlayback();
    } else {
        // まだ準備できていなければ、準備完了イベントを待つ
        video.addEventListener('loadeddata', startPlayback, { once: true });
        // 1秒待っても準備できない場合は、安全のため強制的に開始する
        fallbackTimer = setTimeout(startPlayback, 1000);
    }
}

/**
 * 暗転（フェード）による画面遷移演出
 * @param {function} onDarkMoment 暗転が完了したタイミングで実行する関数
 */
function playFadeTransition(onDarkMoment) {
    const overlay = document.getElementById('fade-overlay');
    if (!overlay) {
        if (onDarkMoment) onDarkMoment();
        return;
    }
    overlay.classList.add('active');
    setTimeout(() => {
        if (onDarkMoment) onDarkMoment();
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 100);
    }, 500);
}

/**
 * 完了したタスクの数に応じて、タスク報告画面の内容を動的に設定する
 * @param {string[]} completedTasks 完了したタスク名の配列
 */
function setupReportScreen(completedTasks) {
    showScreen('screen-report');
    const thoughtText = document.getElementById('report-thought-text');
    const selectionArea = document.getElementById('report-selection-area');
    selectionArea.innerHTML = '';
    selectionArea.style.display = 'none';
    const screenReport = document.getElementById('screen-report');
    const newScreenReport = screenReport.cloneNode(true);
    screenReport.parentNode.replaceChild(newScreenReport, screenReport);
    const currentScreen = document.getElementById('screen-report');
    const currentThoughtText = document.getElementById('report-thought-text');
    const currentSelectionArea = document.getElementById('report-selection-area');
    if (completedTasks.length === 1) {
        currentThoughtText.textContent = 'よし、完了！モブ君に報告しよっと♪';
        currentScreen.onclick = function() {
            localStorage.setItem('currentReportTask', completedTasks[0]);
            showScreen('screen-line');
        };
    } else {
        currentThoughtText.textContent = '今日は色々頑張ったけど、特に頑張った一つをモブ君に報告しよう。';
        currentSelectionArea.style.display = 'flex';
        currentSelectionArea.style.flexDirection = 'column';
        currentSelectionArea.style.gap = '10px';
        currentSelectionArea.style.marginTop = '15px';
        completedTasks.forEach(task => {
            const btn = document.createElement('button');
            btn.textContent = task;
            btn.className = 'cloud-btn';
            btn.style.padding = '10px 20px';
            btn.style.borderRadius = '20px';
            btn.style.border = '2px solid var(--line-deco-1)';
            btn.style.backgroundColor = 'var(--color-white)';
            btn.style.fontFamily = "'M PLUS Rounded 1c', sans-serif";
            btn.style.color = 'var(--text-dark)';
            btn.style.fontSize = '16px';
            btn.style.cursor = 'pointer';
            btn.onclick = function(e) {
                e.stopPropagation();
                
                localStorage.setItem('currentReportTask', task);
                showScreen('screen-line');
            };
            currentSelectionArea.appendChild(btn);
        });
        currentScreen.onclick = null;
    }
}

// ===============================================
// Phase 4-2: 気分共有ロジック
// ===============================================

/**
 * 気分共有イベントを開始する
 */
function startMoodSharing(shouldGlowBackButton = false) {
    const inputBar = document.getElementById('line-input-bar');
    const stampSelector = document.getElementById('mood-stamp-selector');
    const stamps = document.querySelectorAll('.mood-stamp');
    const version = getMobuVersion();
    const timeSlot = getMoodTimeSlot();
    const nickname = localStorage.getItem('nickname') || 'あなた';
    let question = "ところで、今日の気分はどうですか？";
    if (timeSlot !== 'midnight' && moodQuestionDialogues[version] && moodQuestionDialogues[version][timeSlot]) {
        const candidates = moodQuestionDialogues[version][timeSlot];
        const lastShown = localStorage.getItem('moodQuestionDialogueLog');
        let available = candidates.filter(text => text !== lastShown);
        if (available.length === 0) {
            available = candidates;
        }
        const chosen = available[Math.floor(Math.random() * available.length)];
        localStorage.setItem('moodQuestionDialogueLog', chosen);
        question = chosen.replace(/○○/g, nickname);
    }

    appendLineMessage('mobu', question, 1000);

    setTimeout(() => {
        inputBar.style.display = 'none';
        stampSelector.style.display = 'grid';
    }, 1500);

    // ★変更: imgタグのイベントリスナーを設定
    stamps.forEach(stamp => {
        // イベントリスナーの重複を防ぐために、一度クローンして置き換える
        const newStamp = stamp.cloneNode(true);
        stamp.parentNode.replaceChild(newStamp, stamp);
        
        newStamp.addEventListener('click', () => {
            // data-mood属性から気分テキストを、src属性から画像パスを取得
            const mood = newStamp.dataset.mood;
            const stampSrc = newStamp.src;
            handleMoodStampClick(mood, stampSrc, shouldGlowBackButton);
        }, { once: true }); // 一度クリックされたらイベントを解除
    });
}

/**
 * 気分スタンプがクリックされたときの処理
 * @param {string} mood 選択された気分のテキスト (data-mood属性の値)
 * @param {string} stampSrc クリックされたスタンプ画像のパス (src属性の値)
 */
function handleMoodStampClick(mood, stampSrc, shouldGlowBackButton) {
    const inputBar = document.getElementById('line-input-bar');
    const stampSelector = document.getElementById('mood-stamp-selector');
    
    // ★変更: テキストではなく、スタンプ画像を送信する関数を呼び出す
    appendUserStampMessage(stampSrc);

    displayMoodStampReply(mood, 1000, shouldGlowBackButton); // 少し応答を早くする

    setTimeout(() => {
        stampSelector.style.display = 'none';
        inputBar.style.display = 'block';
        checkAndSetupEvent();
    }, 1500); // 全体の流れを少し早める
}

// ===============================================
// イベント分岐ロジック
// ===============================================

/**
 * イベント発生条件をチェックし、必要ならLINE画面にボタンなどを追加する
 */
function willCafeEventTriggerNow() {
    const milestones = [10, 20, 30, 40];
    for (const m of milestones) {
        if (getIsInvited(m) && !getIsWatched(m)) {
            return false;
        }
    }
    const previousTotal = getPreviousTotalTasks();
    const currentTotal = getTotalTasksCompleted();
    for (const milestone of milestones) {
        if (previousTotal < milestone && currentTotal >= milestone) {
            return true;
        }
    }
    return false;
}
function checkAndSetupEvent() {
    const previousTotal = getPreviousTotalTasks();
    const currentTotal = getTotalTasksCompleted();
    const chatArea = document.querySelector('#screen-line .line-chat');
    const existingEventUI = chatArea.querySelector('.event-ui-container');
    if (existingEventUI) {
        existingEventUI.remove();
    }

    // イベントキュー：未視聴のマイルストーンがあれば次の検知を保留
    const milestones = [10, 20, 30, 40];
    for (const m of milestones) {
        if (getIsInvited(m) && !getIsWatched(m)) {
            console.log(`マイルストーン${m}が未視聴のため、次のイベント検知を保留`);
            return;
        }
    }

    let eventTriggeredMilestone = 0;
    for (const milestone of milestones) {
        if (previousTotal < milestone && currentTotal >= milestone) {
            eventTriggeredMilestone = milestone;
            break;
        }
    }
        if (eventTriggeredMilestone > 0) {
        setIsWaitingForRecoveryPhase2(false);
    }
if (eventTriggeredMilestone === 40) {
        import('./firebase-config.js').then(({ saveClearDateToFirestore }) => {
            saveClearDateToFirestore();
        });
    }
    if (eventTriggeredMilestone > 0) {
        const nickname = localStorage.getItem('nickname') || 'あなた';

        const milestoneMessages = {
            10: [
                `ところで${nickname}、今回のタスクで実は10個を超えましたね！一つの節目達成、おめでとうございます！`,
                `${nickname}が並走してくれたから、俺も無事習慣が定着しました。\nだから、俺から送らせてもらってた一方的なメッセージは、今日で卒業しますね...。\n実は${nickname}の為に、ちょっとしたものを用意してるので、またお店に遊びに来てください😊`,
                `それと俺、習慣を変えたら、自分の外見も変えたくなって、ちょっとだけ変えてみたんです。\nわざわざ伝える事でもないですけど💦\nとにかくまたお会いできるのを楽しみにしてますね！`
            ],
            20: [
                `ところで${nickname}、そろそろタスクを20個を超える頃じゃないですか？\nここまで来ると、俺たち『一緒に頑張ってる仲間』って感じで嬉しい😊`,
                `そういえば、ここまで一緒に頑張ってくれた感謝の気持ちとして、${nickname}に渡したいものがあるんです。\n${nickname}がいつも頼む紅茶の傾向から見て、絶対好きだと思った珍しい茶葉なんですよ。\nぜひ試してみてほしいな！`,
                `それと...俺も習慣を変えて、少し余裕が出てきたから、見た目を少しだけ変えてみたんです。\n${nickname}に見てもらいたい。待ってます！`
            ],
            30: [
                `それはそうと、${nickname}、今回のタスクで30個くらい超えてない！？\nすごい✨\nここまで来ると…自分自身でも${nickname}の変化、感じる頃じゃないですか？`,
                `最近は特に${nickname}を応援したいって気持ちが強くなってて...\n今回は、${nickname}が次の目標を書く時に使ってほしいと思って、\n俺が選んだものがあるんです。`,
                `${nickname}の都合がいい時、お店に来てもらえますか？楽しみにしてますね😊`
            ],
            40: [
                `待って！${nickname}、とうとう40個以上もタスクこなしてない？\nおめでとう！本当にすごいよ。俺も嬉しい！`,
                `俺は${nickname}と一緒に頑張ってきて、生き方そのものが変わった気がする。\n\n今すごく${nickname}に会いたい。\n\n俺のお気に入りの場所に${nickname}と一緒に行きたいんだ。`,
                `今、時間が取れるなら、まずはカフェで待ち合わせない？\n\nそこから案内するよ。\n直接伝えたいこともあるし…カフェで待ってる。`
            ]
        };

        const messages = milestoneMessages[eventTriggeredMilestone];

        // 招待済フラグをON
        setIsInvited(eventTriggeredMilestone, true);

        // 現在のinitialDelayを取得するため、チャット欄の最後のメッセージ数から推定
        // リアクションメッセージの後に連投するため1000ms間隔で3通表示
        const baseDelay = 1000;
        appendLineMessage('mobu', messages[0], baseDelay);
        appendLineMessage('mobu', messages[1], baseDelay + 1500);
        appendLineMessage('mobu', messages[2], baseDelay + 3000);

        // 「今すぐ行く」スタンプUIを最後のメッセージから1500ms後に表示
        setTimeout(() => {
            const inputBar = document.getElementById('line-input-bar');
            const replyArea = document.getElementById('notification-reply-area');
            const replyStamp = document.getElementById('reply-stamp-image');

            inputBar.style.display = 'none';
            replyArea.style.display = 'flex';
            replyStamp.src = 'assets/images/stamp_now.webp';

            const newReplyStamp = replyStamp.cloneNode(true);
            replyStamp.parentNode.replaceChild(newReplyStamp, replyStamp);

           newReplyStamp.addEventListener('click', function() {
    appendUserStampMessage('assets/images/stamp_now.webp');
    setTimeout(() => {
        if (eventTriggeredMilestone === 40) {
            playFadeTransition(() => {
                startEndingSequence();
            });
        } else if (isCafeImagesReady(eventTriggeredMilestone)) {
            // 分岐A：ロード完了済み → 暗転後即カフェ画面
            playFadeTransition(() => {
                showScreen('screen-cafe');
                handleCafeEventWithJIT(eventTriggeredMilestone);
            });
        } else {
            // 分岐B：ロード未完了 → 暗転後歩行画面へ
            playFadeTransition(() => {
                showScreen('screen-walking');
                startWalkingToDoor(eventTriggeredMilestone);
            });
        }
    }, 500);
}, { once: true });

        }, baseDelay + 4500);

    } else {
        console.log(`通常タスク報告。累計: ${currentTotal} (前回: ${previousTotal})`);
    }
}

// ===============================================
// Phase 5-1: エンディング演出ロジック
// ===============================================

/**
 * 40回達成時のカフェでの会話からエンディング画面への遷移を管理する
 */
const endingEventData = [
    { dialogue: "○○！来てくれてありがとう。嬉しいよ。ごめん、少し待ってて！上着取ってくるから！" },
    { dialogue: "お待たせ。…時間、大丈夫そうだね？ちょっと歩くけど、○○と一緒に行きたい場所があるんだ。一緒に行こう。", fadeBefore: true },
    { dialogue: "ここが俺のお気に入りの場所だよ。いつか大切な人と一緒に、ここから夕陽を見たいなってずっと思ってたんだ。", fadeBefore: true },
    { dialogue: "本当は○○に初めて会った時から、ここに一緒に来たいと思ってた。でも自信が無くて誘えなかったんだ…。" },
    { dialogue: "…" },
    { dialogue: "…" },
    { dialogue: "○○...。" },
    { dialogue: "出会った時から好きだった。付き合ってほしい。" },
　  { dialogue: "返事はすぐじゃなくても、考えてくれる？" },
    { dialogue: null },
    { dialogue: null },
    { dialogue: null },
    { dialogue: null, whiteOutAfter: true }
];
function startEndingSequence() {
    showScreen('screen-cafe');
    playBGM('bgm_cafe_ambience.mp3', true);
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const cafeScreen = document.getElementById('screen-cafe');
    const bgImage = document.getElementById('cafe-background-image');
    const nickname = localStorage.getItem('nickname') || 'あなた';

    let currentIndex = 0;

    function renderFrame(index) {
        const frame = endingEventData[index];
        if (bgImage) bgImage.src = `assets/images/cafe/cafe40/cafe40_${index + 1}.webp`;
        if (frame.dialogue) {
            dialogueText.textContent = frame.dialogue.replace(/○○/g, nickname);
        } else {
            dialogueText.textContent = '';
        }
    }

    renderFrame(currentIndex);

    cafeScreen.onclick = function() {
        const nextIndex = currentIndex + 1;

        if (nextIndex >= endingEventData.length) {
            return;
        }

        playSE('se_text_advance.mp3');

        if (endingEventData[nextIndex].fadeBefore) {
            playFadeTransition(() => {
                currentIndex = nextIndex;
                renderFrame(currentIndex);
            });
        } else {
            currentIndex = nextIndex;
            renderFrame(currentIndex);
        }

        if (endingEventData[currentIndex].whiteOutAfter) {
            cafeScreen.onclick = function() {
                cafeScreen.onclick = null;

                const whiteOverlay = document.getElementById('ending-whiteout-overlay');
                whiteOverlay.style.display = 'block';

                setTimeout(() => {
                    whiteOverlay.style.opacity = '1';
                }, 10);

                setTimeout(() => {
                    showScreen('screen-epilogue');
                    playBGM('bgm_epilogue_ambience.mp3', true);
                    const beachImage = document.getElementById('epilogue-beach-image');
                    beachImage.style.opacity = '1';
                    whiteOverlay.style.opacity = '0';

                    const blocker = document.getElementById('epilogue-input-blocker');
                    blocker.style.display = 'block';

                    const finText = document.getElementById('epilogue-fin-text');
                    const creditText = document.getElementById('epilogue-credit-text');
                    finText.style.transition = 'opacity 2s';
                    creditText.style.transition = 'opacity 2s';
                    beachImage.style.transition = 'opacity 2s';
                    setTimeout(() => {
                        finText.style.display = 'block';
                        setTimeout(() => { finText.style.opacity = '1'; }, 10);
                    }, 2000);

                    setTimeout(() => {
                        finText.style.opacity = '0';
                        setTimeout(() => {
                            finText.style.display = 'none';
                        }, 2000);
                    }, 5000);

                    setTimeout(() => {
                        creditText.style.display = 'block';
                        setTimeout(() => { creditText.style.opacity = '1'; }, 10);
                    }, 8000);

                    setTimeout(() => {
                        creditText.style.opacity = '0';
                    }, 12000);

setTimeout(() => {
                        beachImage.onclick = function() {
                            beachImage.onclick = null;
                            blocker.style.display = 'block';
                            playBlinkVideo(() => {
                                showScreen('screen-home');
                            });
                        };
                    }, 17000);
                    setTimeout(() => {
                        blocker.style.display = 'none';
                    }, 17000);

                }, 2000);

            };
        }
    };
}

/**
 * D-1 エンディング画面の告白セリフ進行を管理する
 */
function handleEndingDialogue() {
    const endingScreen = document.getElementById('screen-ending');
    const dialogueText = document.querySelector('#screen-ending .dialogue-text');
    const dialogues = [
        "ここが俺のお気に入りの場所だよ。いつか大切な人と一緒にここから夕陽を見たいなってずっと思ってたんだ。",
        "...（ユーザー名）...。好きだ。付き合ってほしい。",
        "返事はすぐじゃなくていいから、考えてくれる？"
    ];
    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];
    playSE('voice_mobu_d1_confession_1.mp3');
    endingScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
            playSE(`voice_mobu_d1_confession_${currentDialogueIndex + 1}.mp3`);
        } else {
            endingScreen.onclick = null;
            showScreen('screen-epilogue');
            playBGM('bgm_epilogue_ambience.mp3', true);
            playSE('voice_mobu_d2_monologue.mp3');
            setTimeout(() => {
                showScreen('screen-staff-roll');
                playBGM('bgm_epilogue_staffroll.mp3', true);
            }, 5000);
        }
    };
}

// ===============================================
// Phase 5-1.5: カフェイベントと誘導ロジック
// ===============================================

/**
 * カフェでのイベント会話（10回、20回達成時など）を管理する
 * @param {number} milestone - 発生させるイベントの達成回数 (10, 20, 30)
 */
function handleCafeEventWithJIT(milestone) {
    const cafeScreen = document.getElementById('screen-cafe');
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const bgImage = document.getElementById('cafe-background-image');
    const nickname = localStorage.getItem('nickname') || 'あなた';
    const dialogueContainer = document.querySelector('#screen-cafe .dialogue-container');
    if (dialogueContainer) dialogueContainer.style.display = '';
    let dialogues = [];
    let imagePaths = [];

    if (milestone === 10) {
        dialogues = [
            `${nickname}！来てくれてありがとうございます。`,
            `えーっと...髪、少し切ったんですけど...似合ってます？`,
            `いや、そんなことより！10個タスク達成、本当におめでとうございます！俺も無事に習慣が定着しました。`,
            `これは、そのお祝いといいますか...試作品のスイーツをサービスさせてもらいますね。`,
            `ふふ、店長特権です。2人だけの秘密ですよ！`
        ];
    } else if (milestone === 20) {
        dialogues = [
            `${nickname}、来てくれたんですね！嬉しいな。ありがとうございます！`,
            `その…メガネやめてコンタクトにしてみたんですけど…どうですか？ずっと変えたいなって思ってたんですよ。`,
            `それはそうと20回以上達成、本当にお疲れさまです。${nickname}が頑張ってるのを見てると、俺まで力が湧いてくるんですよ！`,
            `これ、リラックス効果の高いものとか、美肌効果があるものを、俺がブレンドしてみた茶葉です。味も${nickname}の好みに合うように調整してるから、ぜひ試してみてほしいな。`,
            `また、頑張った話、聞かせてくださいね。俺も、${nickname}に負けないように、次の一歩を進めるから。`
        ];
    } else if (milestone === 30) {
        dialogues = [
            `${nickname}！来てくれてありがとう。`,
            `...${nickname}、少し会わない内に印象変わったね！ちょっと緊張する。いや、もちろんいい意味で...だよ。`,
            `俺も最近、周りから『変わった』って褒められるようになったんだ。常連さんから『恋でもしてるの？』ってからかわれたよ。俺ってそんなに分かりやすいかな？`,
            `あ、本題を忘れてた！タスク30個達成、本当にお疲れさま。俺たち、もうお互いの頑張りを無言で支え合ってる感じだね。`,
            `今日は、これを渡したかったんだ。よかったら使ってほしい。${nickname}が、また新しい目標に向けて進むの、俺は応援したくて。その一歩を書き出すときに、このペンを使ってくれたら嬉しい。…このペンを見かけた時、${nickname}の顔が浮かんだんだ。`,
            `今度はカフェじゃなくて別の場所でも会いたい。もしOKしてくれるなら、俺、もっと頑張れるんだ。`
        ];
    }

    for (let i = 0; i < dialogues.length; i++) {
        imagePaths.push(getCafeImagePath(milestone, i));
    }
if (bgImage) bgImage.src = imagePaths[0];
    dialogueText.textContent = dialogues[0];
    let currentIndex = 0;
    let waitingForHideTap = false;

cafeScreen.onclick = function() {
        if (waitingForHideTap) {
            if (dialogueContainer) dialogueContainer.style.display = 'none';
            waitingForHideTap = false;
            return;
        }

        currentIndex++;

        if (dialogueContainer) dialogueContainer.style.display = '';

        if ((milestone === 20 && currentIndex === 3) ||
            (milestone === 30 && currentIndex === 4)) {
            waitingForHideTap = true;
        }
        if (currentIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentIndex];
            if (bgImage) bgImage.src = imagePaths[currentIndex];
        } else {

           cafeScreen.onclick = null;
            setIsWatched(milestone, true);
            clearCafeExitTime(milestone);
            playFadeTransition(() => {
                showScreen('screen-home');
            });
        }
    };
}
function handleCafeEvent(milestone) {

    const cafeScreen = document.getElementById('screen-cafe');
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const nickname = localStorage.getItem('nickname') || 'あなた';

    let dialogues = [];
    let imageIds = [];

    if (milestone === 10) {
        dialogues = [
            `${nickname}！来てくれてありがとうございます。`,
            `えーっと...髪、少し切ったんですけど...似合ってます？`,
            `いや、そんなことより！10個タスク達成、本当におめでとうございます！俺も無事に習慣が定着しました。`,
            `これは、そのお祝いといいますか...試作品のスイーツをサービスさせてもらいますね。`,
            `ふふ、店長特権です。2人だけの秘密ですよ！`
        ];
        imageIds = [
            'cafe-bg-10-1',
            'cafe-bg-10-2',
            'cafe-bg-10-3',
            'cafe-bg-10-4',
            'cafe-bg-10-5'
        ];
    } else if (milestone === 20) {
        dialogues = [
            `${nickname}、来てくれたんですね！嬉しいな。ありがとうございます！`,
            `その…メガネやめてコンタクトにしてみたんですけど…どうですか？ずっと変えたいなって思ってたんですよ。`,
            `それはそうと20回以上達成、本当にお疲れさまです。${nickname}が頑張ってるのを見てると、俺まで力が湧いてくるんですよ！`,
            `これ、リラックス効果の高いものとか、美肌効果があるものを、俺がブレンドしてみた茶葉です。味も${nickname}の好みに合うように調整してるから、ぜひ試してみてほしいな。`,
            `また、頑張った話、聞かせてください。俺も、${nickname}に負けないように、次の一歩を進めるから。`
        ];
        imageIds = [
            'cafe-bg-20-1',
            'cafe-bg-20-2',
            'cafe-bg-20-3',
            'cafe-bg-20-4',
            'cafe-bg-20-5'
        ];
    } else if (milestone === 30) {
        dialogues = [
            `${nickname}！来てくれてありがとう。`,
            `...${nickname}、少し会わない内に印象変わったね！ちょっと緊張する。いや、もちろんいい意味で...だよ。`,
            `俺も最近、周りから『変わった』って褒められるようになったんだ。常連さんから『恋でもしてるの？』ってからかわれたよ。俺ってそんなに分かりやすいかな？`,
            `あ、本題を忘れてた！タスク30個達成、本当にお疲れさま。俺たち、もうお互いの頑張りを無言で支え合ってる感じだね。`,
            `今日は、これを渡したかったんだ。よかったら使ってほしい。${nickname}が、また新しい目標に向けて進むの、俺は応援したくて。その一歩を書き出すときに、このペンを使ってくれたら嬉しい。…このペンを見かけた時、${nickname}の顔が浮かんだんだ。`,
            `今度はカフェじゃなくて別の場所でも会いたい。もしOKしてくれるなら、俺、もっと頑張れるんだ。`
        ];
        imageIds = [
            'cafe-bg-30-1',
            'cafe-bg-30-2',
            'cafe-bg-30-3',
            'cafe-bg-30-4',
            'cafe-bg-30-5',
            'cafe-bg-30-6'
        ];
    }

    dialogueText.textContent = dialogues[0];

    let currentDialogueIndex = 0;

    cafeScreen.onclick = function() {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];
        } else {
            cafeScreen.onclick = null;
            setIsWatched(milestone, true);
            playFadeTransition(() => {
                showScreen('screen-home');
            });
        }
    };
}

/**
 * 初回起動時の導入セリフ進行を管理する
 * @param {'start' | 'motivation'} type どちらの導入セリフか
 */
function handleIntroductionDialogue(type) {
    const cafeScreen = document.getElementById('screen-cafe');
    const dialogueText = document.querySelector('#screen-cafe .dialogue-text');
    const bgImage = document.getElementById('cafe-background-image');
    const nickname = localStorage.getItem('nickname') || 'あなた';

    let dialogues = [];

    if (type === 'start') {
        dialogues = [
            `${nickname}、いらっしゃいませ。今日も来てくれて嬉しいです。いつもの席でよろしいですか？`,
            `あ、そういえば${nickname}。前に『習慣作り』の話をされてましたよね？俺も最近ずっと考えているんです。また後で、何か面白い情報があったら教えてくださいね！`
        ];
    } else if (type === 'motivation') {
        dialogues = [
            `あ、その音って今話題のBEAREALの音ですか？実は俺も、最近何かを習慣にしたくて気になってたんです。`,
            `デザインがかわいらしすぎて、結局ダウンロードはしなかったんだけど...やっぱり本気で自分磨きは始めたくて。`,
            `だから…俺も一緒に自分磨き、始めていいですか？誰かと一緒なら頑張れる気がするんです。返信しなくてもいいので、習慣が俺に定着するまでは、${nickname}にメッセージ送ってもいいですか？送らせてもらえたら嬉しいです。`
        ];
        localStorage.setItem('appPhase', 'introduction_motivation');
    }

    let currentDialogueIndex = 0;
    dialogueText.textContent = dialogues[currentDialogueIndex];

    // 最初の画像
    if (bgImage) {
        bgImage.src = cafeImageMap[`${type}_0`] || '';
    }

    cafeScreen.onclick = function () {
        currentDialogueIndex++;

        if (currentDialogueIndex < dialogues.length) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = dialogues[currentDialogueIndex];

            if (bgImage) {
                bgImage.src = cafeImageMap[`${type}_${currentDialogueIndex}`] || '';
            }

            return;
        }

        // motivation専用の「……」演出
        if (type === 'motivation' && currentDialogueIndex === 3) {
            playSE('se_text_advance.mp3');
            dialogueText.textContent = '……';

            if (bgImage) {
                bgImage.src = 'assets/images/mobu_v1_motivation_wait.webp';
            }

            cafeScreen.onclick = function () {
                playSE('se_text_advance.mp3');

                dialogueText.textContent =
                    `……あ、いいですか？やった！ありがとうございます！……あ、そうだ。それで俺、自分磨きを始めようと思って気づいたんですけど、`;

                if (bgImage) {
                    bgImage.src = 'assets/images/mobu_v1_motivation_glad.webp';
                }

                cafeScreen.onclick = null;

                localStorage.setItem('appPhase', 'main_loop');
                localStorage.setItem('showFirstHomeBanner', 'true');
                localStorage.setItem('isBannerRead', 'false');

                const reportDialogues = [
                    
                    
                    `自分磨きって、達成してもなかなか誰かに褒めてもらえないじゃないですか？それで、結果もなかなか目に見えなかったらモチベ落ちていきません？`,
                    `だから...タスクが終わって達成感を誰かに伝えたい時は、俺を頼ってほしい。いつでも俺に報告してください。一番に応援するから。自分磨きっていう共通の事で、俺も${nickname}の役に立てたらなって！`,
                    `あ、俺用事あるの忘れてた！じゃあ、また！`
                ];
                let reportIndex = -1;

                setTimeout(() => {
                    cafeScreen.onclick = function () {
                        reportIndex++;

                        if (reportIndex < reportDialogues.length) {
                            playSE('se_text_advance.mp3');
                            dialogueText.textContent = reportDialogues[reportIndex];

                            if (bgImage) {
                                bgImage.src = cafeImageMap[`report_${reportIndex}`] || '';
                            }

                            if (reportIndex === reportDialogues.length - 1) {
                                cafeScreen.onclick = function () {
                                    cafeScreen.onclick = null;
                                    playBlinkVideo(() => showScreen('screen-home'));
                                };
                            }

                            return;
                        }
                    };
                }, 100);
            };

            return;
        }

        // 通常終了
        cafeScreen.onclick = null;

 if (type === 'start') {
            localStorage.setItem('appPhase', 'introduction_task_select');
            playBlinkVideo(() => showScreen('screen-task-select'));
        }
    };
}

/**
 * 設定画面の表示とデータ更新を行う
 */
function showSettingsScreen() {
    // まず画面を切り替える
    showScreen('screen-settings');

    // 現在保存されているニックネームを取得して入力欄に表示する
    const nicknameInput = document.getElementById('setting-nickname-input');
    const currentNickname = localStorage.getItem('nickname') || '';
    if (nicknameInput) {
        nicknameInput.value = currentNickname;
    }
}

// ===============================================
// Phase3-X: フェイク通知UI ロジック
// ===============================================

/**
 * LINE風のフェイク通知バナーを表示し、クリックイベントを設定する
 * @param {string} sender - 送信者名
 * @param {string} message - メッセージ本文
 * @param {string} iconSrc - プロフィールアイコンの画像パス
 * @param {string} notificationType - 通知の種類 ('periodic' or 'onee')
 */
function showFakeNotification(sender, message, iconSrc, notificationType, milestone = null, slotInfo = null) {
const banner = document.getElementById('fake-notification-banner');
    const senderEl = document.getElementById('notification-sender');
    const messageEl = document.getElementById('notification-message');
    const iconEl = document.getElementById('notification-icon');

    if (!banner || !senderEl || !messageEl || !iconEl) {
        console.error('フェイク通知の要素が見つかりません。');
        return;
    }
    
    // 最初に要素を置き換える（クリックイベントの重複防止）
    const newBanner = banner.cloneNode(true);
    banner.parentNode.replaceChild(newBanner, banner);
    
    // 置き換えた後の要素を取得
    const replacedBanner = document.getElementById('fake-notification-banner');
    const replacedSenderEl = document.getElementById('notification-sender');
    const replacedMessageEl = document.getElementById('notification-message');
    const replacedIconEl = document.getElementById('notification-icon');
    
    // 内容を設定
    replacedSenderEl.textContent = sender;
    replacedMessageEl.textContent = message;
    replacedIconEl.src = iconSrc;
    playSE('se_line_receive.mp3');

    const currentBannerSlotInfo = slotInfo || { slot: getCurrentTimeOfDay(), date: getGameDate() };
    localStorage.setItem('currentBannerSlotInfo', JSON.stringify(currentBannerSlotInfo));
    localStorage.setItem('currentBannerIsPeriodic', notificationType === 'periodic' ? 'true' : 'false');
        if (notificationType === 'periodic') {
        saveFixedSlotDialogue(message, currentBannerSlotInfo.displayTime || 'now');
    }
    // 50ms遅らせてshowを付ける（スライドイン演出）
    setTimeout(() => {
        replacedBanner.classList.add('show');
    }, 50);

    // タップ時：バナーは消さず、LINE画面に遷移するだけ
   replacedBanner.addEventListener('click', function() {
        // どの通知がタップされたかを localStorage に保存
        localStorage.setItem('lastBannerReadTime', Date.now().toString());
        localStorage.setItem('lastBannerReadTime', Date.now().toString());
        localStorage.setItem('tappedNotification', JSON.stringify({
            type: notificationType,
            sender: sender,
            message: message,
            icon: iconSrc,
            milestone: milestone
        }));
        if (slotInfo) {
            markSlotAsTapped(slotInfo.slot, slotInfo.date);
        }

        // 重要：復帰プロセス段階2のフラグ消去（バナーをタップした瞬間）
        if (notificationType === 'recovery') {
            setIsWaitingForRecoveryPhase2(false);
        }
        if (notificationType === 'periodic') {
            if (!slotInfo) {
                markSlotAsShown();
            }
            addToSlotDialogueHistory(message);
            localStorage.removeItem('showFirstHomeBanner');
            localStorage.removeItem('showFirstHomeBanner');
            localStorage.setItem('isBannerRead', 'true');
        }
        // 瞬き演出を挟んでLINE画面へ遷移
        replacedBanner.classList.remove('show');
        playBlinkVideo(() => {
            showScreen('screen-line');
        });
    }, { once: true });
}

/**
 * 現在の時刻に基づいて 'morning', 'afternoon', 'night' のいずれかの時間帯を返す
 * @returns {('morning'|'afternoon'|'night')}
 */
// ===============================================
// メッセージ表示：スロット管理・6時間ロック
// ===============================================

function getMessageDisplayLog() {
    return JSON.parse(localStorage.getItem('messageDisplayLog') || '{}');
}

function saveMessageDisplayLog(log) {
    localStorage.setItem('messageDisplayLog', JSON.stringify(log));
}

// 現在のスロットで今日すでに表示済みかチェック
function hasShownInCurrentSlot() {
    const log = getMessageDisplayLog();
    const slot = getCurrentTimeOfDay();
    const today = getGameDate();

    if (slot === 'night' && log.nightLockUntil && Date.now() < log.nightLockUntil) {
        return true;
    }

    return log.date === today && log.slot === slot;
}

// 現在のスロットを表示済みとして記録
function markSlotAsShown() {
    const log = getMessageDisplayLog();
    const slot = getCurrentTimeOfDay();
    const today = getGameDate();

    log.date = today;
    log.slot = slot;

    // 夜スロットなら6時間ロックを設定
    if (slot === 'night') {
        log.nightLockUntil = Date.now() + 6 * 60 * 60 * 1000;
    }

    saveMessageDisplayLog(log);
}

function saveFixedSlotDialogue(text, displayTime) {
    const gameDate = getGameDate();
    const slot = getCurrentTimeOfDay();
    const data = {
        date: gameDate,
        slot: slot,
        text: text,
        displayTime: displayTime
    };
    const key = 'fixedSlotDialogue_' + gameDate + '_' + slot;
    localStorage.setItem(key, JSON.stringify(data));
}

function getFixedSlotDialogue() {
    const gameDate = getGameDate();
    const slot = getCurrentTimeOfDay();
    const key = 'fixedSlotDialogue_' + gameDate + '_' + slot;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
}
function markSlotAsViewed(slot, gameDate) {
    const key = 'viewedSlot_' + gameDate + '_' + slot;
    localStorage.setItem(key, 'true');
}

function getIsSlotViewed(slot, gameDate) {
    const key = 'viewedSlot_' + gameDate + '_' + slot;
    return localStorage.getItem(key) === 'true';
}

function clearSlotViewed(slot, gameDate) {
    const key = 'viewedSlot_' + gameDate + '_' + slot;
    localStorage.removeItem(key);
}
function markSlotAsTapped(slot, gameDate) {
    const key = 'tappedSlot_' + gameDate + '_' + slot;
    localStorage.setItem(key, 'true');
}

function getIsSlotTapped(slot, gameDate) {
    const key = 'tappedSlot_' + gameDate + '_' + slot;
    return localStorage.getItem(key) === 'true';
}
function getPendingBanners() {
    const currentSlot = getCurrentTimeOfDay();
    const currentDate = getGameDate();
    const viewedKeys = Object.keys(localStorage).filter(k => k.startsWith('viewedSlot_'));
    const pending = [];

    viewedKeys.forEach(viewedKey => {
        const withoutPrefix = viewedKey.replace('viewedSlot_', '');
        const lastUnderscoreIndex = withoutPrefix.lastIndexOf('_');
        const date = withoutPrefix.substring(0, lastUnderscoreIndex);
        const slot = withoutPrefix.substring(lastUnderscoreIndex + 1);

        if (date === currentDate && slot === currentSlot) return;

        if (getIsSlotTapped(slot, date)) return;

        const dialogueKey = 'fixedSlotDialogue_' + date + '_' + slot;
        const raw = localStorage.getItem(dialogueKey);
        if (!raw) return;

        pending.push(JSON.parse(raw));
    });

    pending.sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        const order = { morning: 0, afternoon: 1, night: 2 };
        return order[a.slot] - order[b.slot];
    });

    return pending;
}

function discardPendingBanners() {
    const pendingBannersList = getPendingBanners();
    pendingBannersList.forEach(banner => {
        const key = 'fixedSlotDialogue_' + banner.date + '_' + banner.slot;
        localStorage.removeItem(key);
    });
}
function renderPendingBannerStack() {
    const container = document.getElementById('pending-banner-stack');
    if (!container) return;

    const pending = getPendingBanners();
    container.innerHTML = '';

    pending.forEach(banner => {
        const bannerEl = document.createElement('div');
        bannerEl.className = 'fake-notification stacked-banner';

        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        const iconImg = document.createElement('img');
        iconImg.src = getMobuIconSrc();
        iconImg.alt = 'icon';
        iconImg.className = 'profile-icon';
        const appBadge = document.createElement('div');
        appBadge.className = 'app-badge';
        appBadge.textContent = 'IINE';
        iconContainer.appendChild(iconImg);
        iconContainer.appendChild(appBadge);

        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        const senderP = document.createElement('p');
        senderP.className = 'sender-name';
        senderP.textContent = 'モブ君';
        const messageP = document.createElement('p');
        messageP.className = 'message-text';
        messageP.textContent = banner.text;
        textContainer.appendChild(senderP);
        textContainer.appendChild(messageP);

        const timeStamp = document.createElement('div');
        timeStamp.className = 'time-stamp';
        const timeP = document.createElement('p');
        timeP.textContent = banner.displayTime === 'now' ? '今' : banner.displayTime;
        timeStamp.appendChild(timeP);

        const content = document.createElement('div');
        content.className = 'notification-content';
        content.appendChild(iconContainer);
        content.appendChild(textContainer);
        content.appendChild(timeStamp);

        bannerEl.appendChild(content);
        container.appendChild(bannerEl);
    });
}
// ===============================================
// メッセージ表示：CSVセリフデータ
// ===============================================

const SLOT_DIALOGUES = [
    // ① 白湯 task-select-1
    { taskId: 'task-select-1', type: 'all', displayTime: 'now', text: '白湯、ちゃんと飲んでます？身体のためにも水分補給していきましょうね。' },
    { taskId: 'task-select-1', type: 'all', displayTime: 'now', text: '白湯ってSNS映えするような華やかさは無いですけど、地味だから続けやすいですよね。' },
    { taskId: 'task-select-1', type: 'morning', displayTime: 'now', text: '俺も今、白湯飲みながらメッセージ打ってます。……ちょっと一緒に頑張ってる気がしますね。' },
    { taskId: 'task-select-1', type: 'afternoon', displayTime: 'now', text: '朝、白湯飲むの忘れても、お昼休みに温かいもの飲むとホッとしますね。胃が温まると午後も動けそうな気がして。○○もお昼、ちゃんとホッとできる時間とれてますか？' },
    { taskId: 'task-select-1', type: 'night', displayTime: 'now', text: '朝、寝起きに白湯を飲もうと思って今から準備してます。俺は朝が苦手なので…ちょっとオシャレなやかん買って気合い入れました！' },
    { taskId: 'task-select-1', type: 'all', displayTime: 'now', text: '飲み忘れたら今でも遅くないですよ。体がぽかぽかしてくるの、気持ちいいですよね。' },
    { taskId: 'task-select-1', type: 'morning', displayTime: 'now', text: '白湯、飲みました？　体の中から少しずつ目を覚ましましょうね。' },

    // ② フルーツ task-select-3
    { taskId: 'task-select-3', type: 'morning', displayTime: 'now', text: '朝のフルーツ、何入れてます？朝ごはんにフルーツがあるだけでちょっと嬉しいですよね' },
    { taskId: 'task-select-3', type: 'afternoon', displayTime: 'now', text: 'ビタミン摂るのってサプリの方が効率がいいんでしょうけど...\n果物の方がやっぱりテンションあがりますね！' },
    { taskId: 'task-select-3', type: 'night', displayTime: 'now', text: '朝、奮発してたくさん果物食べたんですけど、なんだか午前中ずっと機嫌よくいられた気がします。やっぱり甘いものって大事ですね。' },
    { taskId: 'task-select-3', type: 'all', displayTime: 'now', text: '朝に好きなフルーツがあるだけで、起きるのがちょっと楽しみになりません？\nタスクそのものがご褒美みたいだと続けやすいですよね！' },
    { taskId: 'task-select-3', type: 'all', displayTime: 'now', text: '切ったり、洗ったりさえ面倒な時ありません？俺は今日カットフルーツにしました。' },
    { taskId: 'task-select-3', type: 'all', displayTime: 'now', text: '最近はフルーツがあるから、という理由で朝が好きになってきました。○○はどうですか？' },

    // ③⑬ スキンケア task-select-10（朝版・夜版・汎用）
    { taskId: 'task-select-10', type: 'morning', displayTime: 'now', text: 'よく眠れました？○○の肌も労わってあげてくださいね' },
    { taskId: 'task-select-10', type: 'morning', displayTime: 'now', text: '朝のスキンケア、急いでるとつい雑になっちゃうんですよね。今日はゆっくり、ちょっとだけ丁寧にしてみます？' },
    { taskId: 'task-select-10', type: 'afternoon', displayTime: 'now', text: 'さっき鏡を見て、朝のスキンケアを適当に済ませたのを後悔しました…。やっぱり朝の保湿って大事ですね。夜はしっかり、自分の肌を労わってあげようと思います。' },
    { taskId: 'task-select-10', type: 'afternoon', displayTime: 'now', text: '今日の夜は、撮り溜めしてたドラマ見ながらスキンケアがんばる予定です。楽しい事とセットにするとセルフケアも楽しいですね👍○○も何か好きな事とセットにしてますか？' },
    { taskId: 'task-select-10', type: 'night', displayTime: 'now', text: 'お疲れ様です。夜のスキンケア、頑張れそうですか？無理のない範囲で続けましょうね' },
    { taskId: 'task-select-10', type: 'night', displayTime: 'now', text: '夜のスキンケアって、癒しの時間ですよね。○○の肌が、ゆっくり休めますように。' },
    { taskId: 'task-select-10', type: 'all', displayTime: 'now', text: '良い香りの化粧水ってありますよね。好きな香りと一緒なら、楽しくケアできそうだと思いません？' },
    { taskId: 'task-select-10', type: 'all', displayTime: 'now', text: '疲れた顔も、優しく触れるだけで少し元気になる気がしますね。○○も、頑張った自分をちゃんと労ってください。' },

    // ④ 間食 task-select-2
    { taskId: 'task-select-2', type: 'all', displayTime: 'now', text: '間食、我慢できてます？俺は我慢してるけど、昨日夢の中でケーキ食べちゃった…' },
    { taskId: 'task-select-2', type: 'all', displayTime: 'now', text: '今朝、無意識にスイーツ特集見てました…。キツいのはきっと最初だけですよね！' },
    { taskId: 'task-select-2', type: 'all', displayTime: 'now', text: '「今日はいいかな」って思う日もありますよね。お互い励ましあいながら頑張りましょう！' },
    { taskId: 'task-select-2', type: 'all', displayTime: 'now', text: '間食を我慢すると、ごはんがすごくおいしく感じる事に気づきました😊' },
    { taskId: 'task-select-2', type: 'all', displayTime: 'now', text: '甘い誘惑、来ました？俺もさっき危なかったです。お互いセーフでしたね…！' },
    { taskId: 'task-select-2', type: 'all', displayTime: 'now', text: 'さっきインスタでおしゃれなカフェのおいしそうなスイーツが流れてきて危なかったです！でも、ご褒美でならいいですかね...？○○といつか行きたいです😄' },


    // ⑤ ストレッチ task-select-7
    { taskId: 'task-select-7', type: 'afternoon', displayTime: 'now', text: 'ちょっと一息つく時間、取れてますか？🙂もし肩とか凝ってたら、軽くストレッチして少しだけ体をほぐしてみてくださいね。' },
    { taskId: 'task-select-7', type: 'afternoon', displayTime: 'now', text: '今日はお昼休憩にしっかりストレッチするって決めてるんです。午前中、ずっと同じ姿勢だと身体がガチガチになっちゃいますもんね。○○も、無理しないでくださいね。' },
    { taskId: 'task-select-7', type: 'night', displayTime: 'now', text: 'お昼にストレッチしたおかげで、いつもより肩が楽な気がします。やっぱりこまめに動かすのって大事ですね！' },
    { taskId: 'task-select-7', type: 'all', displayTime: 'now', text: '1分のストレッチでも時間が惜しいって感じるくらい余裕ない時ってありますよね。でも○○なら、コツコツ頑張ってそうだなって思います。' },
    { taskId: 'task-select-7', type: 'afternoon', displayTime: 'now', text: '仕事の合間にぐーっと伸びるだけで、少し目が覚めるんですよね。もうひと頑張りしましょうか！' },

    // ⑥ 階段 task-select-8
    { taskId: 'task-select-8', type: 'all', displayTime: 'now', text: '今日も階段、選びました？その小さな選択、大きな一歩だと思います。' },
    { taskId: 'task-select-8', type: 'all', displayTime: 'now', text: '階段を上るっていうだけでもちょっとした眠気ざましになりますね！' },
    { taskId: 'task-select-8', type: 'all', displayTime: 'now', text: '俺はジム通いって続かなくて…階段使う位なら、続いてます。○○はどうですか？' },
    { taskId: 'task-select-8', type: 'all', displayTime: 'now', text: 'エレベーター待ってる時間って地味に長く感じませんか？俺ならその時間で階段上っちゃうかも。……なんて、○○ならもう実践してそうですね。' },
    { taskId: 'task-select-8', type: 'all', displayTime: 'now', text: '階段を上る時の足の重さ、頑張ってる証拠ですよね。俺も負けないように、一段ずつ上ります！' },

    // ⑦ 背筋 task-select-9
    { taskId: 'task-select-9', type: 'all', displayTime: 'now', text: '背中、気づいたら丸まってません？（俺の事なんですけど🫠）ちょっと伸ばして、ついでに深呼吸しましょうか？' },
    { taskId: 'task-select-9', type: 'all', displayTime: 'now', text: 'ハッ！俺また猫背になってました。○○はどうですか？' },
    { taskId: 'task-select-9', type: 'all', displayTime: 'now', text: '俺、集中しすぎると、猫背になるみたい…。○○は大丈夫ですか？' },
    { taskId: 'task-select-9', type: 'all', displayTime: 'now', text: '背筋が伸びている人って、それだけで格好よく見えますよね。○○のシャキッとした姿、想像してます。' },
    { taskId: 'task-select-9', type: 'all', displayTime: 'now', text: '背筋を伸ばすだけで雰囲気変わるんでしょうか？姿勢を意識してるだけなのに、最近「雰囲気違うね」ってよく言われるようになりました✌️' },

    // ⑧ ハンドケア task-select-11
    { taskId: 'task-select-11', type: 'all', displayTime: 'now', text: '手って、一番働き者なのにケアを後回しにしちゃいますよね。ハンドクリーム、塗ってあげてくださいね。' },
    { taskId: 'task-select-11', type: 'all', displayTime: 'now', text: '好きな香りのハンドクリームだと、塗るだけでちょっとリフレッシュしますよね！' },
    { taskId: 'task-select-11', type: 'all', displayTime: 'now', text: '手のケアってつい面倒でサボっちゃいません？俺は最近やっと皿洗いの時、ゴム手袋付けるようになりました' },
    { taskId: 'task-select-11', type: 'all', displayTime: 'now', text: 'また、ササクレ出来てた…。つい、剝いてしまって地味に痛くて後悔するんですよね。○○は俺みたいにならないようにクリーム塗ってるといいんですけど…。' },
    { taskId: 'task-select-11', type: 'all', displayTime: 'now', text: '「ただリップを塗る」だけだと忘れがちなので、眠気覚ましにもなるメントール入りを買ってみました。○○はどんな風に続ける工夫をしてますか？今度教えてくださいね！' },

    // ⑨ 片づけ task-select-5
    { taskId: 'task-select-5', type: 'all', displayTime: 'now', text: '部屋の片づけ、目の前のもの5つ片づけるだけでも、スッキリするんですよね' },
    { taskId: 'task-select-5', type: 'all', displayTime: 'now', text: '「1カ所だけ」って、いいルールですよね。完璧じゃなくていいのが続けやすいです。' },
    { taskId: 'task-select-5', type: 'all', displayTime: 'now', text: '頭使う作業してると、片付けっていう単純作業が気分転換になりますね！' },
    { taskId: 'task-select-5', type: 'all', displayTime: 'now', text: '片づけてるうちに、頭空っぽになる瞬間ありません？俺、あの時間好きなんです。' },
    { taskId: 'task-select-5', type: 'all', displayTime: 'now', text: '俺、最近、休憩と片づけがセットになってます。○○は順調ですか？' },

    // ⑩ スマホ休憩 task-select-4
    { taskId: 'task-select-4', type: 'morning', displayTime: 'now', text: '昨日の夜、早めにスマホを置いて寝たら、今朝はすごく目がスッキリしてて驚きました。やっぱり夜のデジタルデトックスって効果あるんですね。こういう小さくても嬉しい事を共有できるってなんか嬉しいです😊' },
    { taskId: 'task-select-4', type: 'morning', displayTime: 'now', text: '昨日の夜、○○にメッセージを送ったあとに\nすぐスマホ閉じたら即寝ちゃってました。\n○○とやり取りすると癒されるからかな、ぐっすり快眠でした👍' },
    { taskId: 'task-select-4', type: 'afternoon', displayTime: 'now', text: '昨日は寝る直前までスマホを見てしまいました。…なので、戒めに昼休憩はスマホなしで外の景色見ながらランチしてみました。○○に連絡するって考えると、夜できなくても「違う時間で工夫しなきゃ」って思えて、完璧じゃなくてもなんとか続いてます！' },
    { taskId: 'task-select-4', type: 'afternoon', displayTime: 'now', text: '最近、寝る前のスマホ時間を減らそうと格闘中です。とりあえず、スマホのアラームで起きるのを止めて、目覚まし時計で起きるようにしてみました！' },
    { taskId: 'task-select-4', type: 'night', displayTime: 'now', text: '俺、朝からスマホ見過ぎたから今反省中なんです...。だからこのメッセージ送ったら、しばらくスマホ見ないって決めました！○○も、目が疲れてたら一緒にプチデジタルデトックスいかがですか？' },
    { taskId: 'task-select-4', type: 'night', displayTime: 'now', text: '○○に送るこのメッセージを最後に、俺はスマホ置きます。離れていても、それぞれの場所で、ゆっくりひと息つけたら嬉しいです😌' },
    { taskId: 'task-select-4', type: 'night', displayTime: 'now', text: 'スマホを置いて、静かな時間を作るのって贅沢ですよね。ホットアイマスクもあれば最高です。' },
    { taskId: 'task-select-4', type: 'all', displayTime: 'now', text: '寝る前のスマホタイムが無いのは無理！って前は思ってましたけど、慣れると無い方が快適かも...。○○はどうですか？' },
    { taskId: 'task-select-4', type: 'all', displayTime: 'now', text: '寝る前のプチデジタルデトックス、順調ですか？俺は、オススメに上がってきた猫動画見たら寝る！って決めてます！' },

    // ⑪ ありがとう task-select-6
    { taskId: 'task-select-6', type: 'all', displayTime: 'now', text: '疲れてる日は【"ありがとう"を思い出す】のも大変ですよね。そんな時俺は、毎日動いてくれる自分の体にありがとうって言ってます' },
    { taskId: 'task-select-6', type: 'all', displayTime: 'now', text: '「今日の"ありがとう"をひとつ思い出す」って、いい習慣ですよね！\n俺は今、一緒に頑張ってくれる○○に「ありがとう」\nって言いたい気分です。' },
    { taskId: 'task-select-6', type: 'all', displayTime: 'now', text: '誰かに感謝できる日って、それだけで幸せですよね。' },
    { taskId: 'task-select-6', type: 'all', displayTime: 'now', text: '○○が今日「ありがとう」って思った相手、きっと笑顔になってますよ。' },
    { taskId: 'task-select-6', type: 'night', displayTime: 'now', text: 'ありがとうを思い出せたら、きっと幸せな気持ちで眠れますね。' },

    // ⑫ 深呼吸 task-select-12
    { taskId: 'task-select-12', type: 'all', displayTime: 'now', text: '疲れてても深呼吸だけしてみますか？ふぅ～。ちょっと力抜けますね！' },
    { taskId: 'task-select-12', type: 'all', displayTime: 'now', text: '意識してゆっくり息を吐くだけで、疲れが少し抜けますね。\n○○も一息付けてますか？' },
    { taskId: 'task-select-12', type: 'all', displayTime: 'now', text: 'ため息をつくと幸せが逃げる、なんて言いますけど、深呼吸ならセーフです！今、少し試してみません？' },
    { taskId: 'task-select-12', type: 'all', displayTime: 'now', text: '忙しい時ほど、呼吸が浅くなりません？深呼吸だけでも少しリフレッシュできますね！' },
    { taskId: 'task-select-12', type: 'all', displayTime: 'now', text: '俺は最近、余裕が無い時程、深呼吸するようになりました。なんか冷静になれるんですよね。' },
];
const TASK_REACTION_DIALOGUES = {
    ver1: {
        individual: {
            'task-select-1': '朝の白湯、体が温まって良さそうですね。俺も真似してみたら、なんだかホッとしました。素敵な習慣ですね😊',
            'task-select-2': '間食をグッと我慢したんですね。俺なら誘惑に負けそう😂○○の意志の強さ、見習いたいです。',
            'task-select-3': '偉い！有言実行ですね😊朝食にフルーツを添えるの、俺も始めました！\nお互い続けていきましょうね！',
            'task-select-4': '寝る前のスマホを控える時間、静かでいいですね。俺も画面を閉じて、○○と今日話したこととか思い出してました😊',
            'task-select-5': 'さすがです👍俺は、今○○に連絡が、一カ所片づけるきっかけになりました！一カ所でも気分がいいです！',
            'task-select-6': '感謝を思い返すの、あたたかい気持ちになりますね。そういうの大切にしてる○○は、優しい人ですね😌',
            'task-select-7': '１分間でも体がほぐれて気持ちいいですよね👍\n気づいたらそれがきっかけで、ちょっと運動始めてることありません？',
            'task-select-8': '健康を意識されていて凄いです。疲れてると地味にきついんですよね💦\nでも階段選んで後悔する事って意外とないかも😊',
            'task-select-9': 'いいですね👍背筋を伸ばすと、いつも着ている服がもっと素敵に見える気がしません？',
            'task-select-10': '自分を大切にされていて素敵です。○○が、報告してくれるから、俺も少しは肌を労ろうかなって、気持ちになれました😊',
            'task-select-11': 'そういう所まで気を配れるの、憧れます！\n俺もハンドクリームくらいは、つけるようになりました🙂',
            'task-select-12': '張り詰めた心が緩みますね。俺も今、深呼吸みました…。隣にいるみたいで、落ち着きます😌'
        },
        categoryGeneric: {
            care: [
                '自分を優しく労わる時間、とても大切ですね。\n○○がそういう時間を過ごしてるって教えてくれて、うれしいです😊',
                '身体を労う選択ができる人って、『大人』って感じがしますね。\n俺も○○を見習って、もっと自分を大切にしようって思えました👌'
            ],
            active: [
                '忙しくても時間を作って、\nコツコツ継続できるの本当に尊敬します！\n俺も最近、簡単な筋トレ始めました！\n○○のやる気が俺にうつったかも😄',
                'コツコツと行動を起こせるの、流石ですね。\n○○から報告もらえると、やる気スイッチ入るんですよね✨いつもありがとうございます！'
            ]
        },
        superGeneric: [
            '頑張る○○を見てると、俺も、もっと頑張ろうって思えます👍○○のメッセージが俺のやる気スイッチです！',
            '報告ありがとうございます。無事にやり遂げて、本当に凄いな…。俺まで嬉しくなりました😊'
        ]
    },
   ver2: {
        individual: {
            'task-select-1': '白湯、温まりますよね。俺も○○を真似して始めてみようかな😊',
            'task-select-2': '間食我慢できたなんて、偉い‼️俺だったら誘惑に負けそうだから、本当に尊敬します。',
            'task-select-3': 'フルーツ見ると○○を思い出すようになりました。○○を思い出せるものが増えてなんか…嬉しい😄',
            'task-select-4': 'スマホを置いて目を休める時間、大切ですよね。…今夜は穏やかに、ゆっくり眠れますように😌',
            'task-select-5': '1カ所片づくだけで、空気が軽くなる気がしますね。…心まで、すっきり整うみたいな感じ✨',
            'task-select-6': '素敵な気づきですね。俺にとっての今日の"ありがとう"は……○○と話せたことです☺️',
            'task-select-7': '1分のストレッチでも、体がそっと解れて心地いいですよね。1分でも全然、差が出ると思います👍',
            'task-select-8': '階段を選ぶのって、結構パワーいりますよね。…○○のそういう前向きなところ、好きだな😊',
            'task-select-9': '背筋が伸ると、不思議と表情まで変わる気がする。今、○○はどんな顔してるんだろう。早く会いたいです‼️',
            'task-select-10': '丁寧なスキンケア、自分を大切にしてる感じでいいな。結果は関係なくて、そういうことを続けられる○○はステキな人です✨',
            'task-select-11': 'そういうケアって、優しさですよね。○○が自分自身に優しくしてるのを知れて、うれしい😊',
            'task-select-12': '深呼吸って、落ち着きますよね。俺も今、深呼吸したら、○○と話してる時みたいに、リラックスできた😌'
        },
        categoryGeneric: {
            care: [
                'そうやって自分を労る時間、すごく大切ですよね。\n\nこうして今日も、その時間を共有してくれるの本当に嬉しいな😄',
                '連絡ありがとう‼️最近はあまり会えてないけど、○○が、元気に過ごしてるって知れて、こういう連絡もらえるとホッとします😊'
            ],
            active: [
                '健やかに動く姿、すごく前向きで格好いい👍\n\nそれに小さい達成感って、自信につながりますよね！',
                '調子いいですね👍○○を見てると俺も負けてられないなって、やる気出るんですよ！'
            ]
        },
        superGeneric: [
            '報告ありがとう！小さな積み重ねだけど、確実に○○の成長に繋がってると思う✊俺も負けません😄',
            '今日もこうして頑張りを共有できて嬉しいな。…明日も、応援させてください✊'
        ]
    },
    ver3: {
        individual: {
            'task-select-1': '忙しい朝は、熱い飲み物ゆっくり飲むのって地味にハードル高いのに、えらい😊朝からいいスタートですね！',
            'task-select-2': '…すごい！○○偉すぎる！俺は今日間食してしまいました💦職場がカフェだから美味しいものに常に囲まれてるから…って言い訳は今日でやめます！',
            'task-select-3': '忙しくてもコツコツ続けてる○○って、素敵だな✨体も喜んでると思います！',
            'task-select-4': '目を休められていいですね。スマホ触るのやめた代わりに寝る前、何してますか？俺は本読みながら寝落ちがルーティンになってます😌',
            'task-select-5': '片づけ、お疲れ様！なぜか今○○がせっせと片づけてる姿が思い浮かんで和みました😊',
            'task-select-6': 'それってホントに素敵な習慣ですよね。その習慣を持ってる○○はきっと、たくさんの人に『ありがとう』って思われてる👍',
            'task-select-7': '一分だけでも偉いよ！ホントに。俺も負けてられないな✊○○の報告が俺にやる気を出させてくれるんです！',
            'task-select-8': '着実に習慣化してるんじゃないですか？そのお陰か『最近○○、雰囲気変わったね』って、今日常連組で話してたんですよ😊',
            'task-select-9': '今日はウォーキングの先生がお店にいらしたんだけど、\nその先生が、\n○○の姿勢がキレイだってボソッと褒めてた👍聞いた瞬間、伝えたかったんだけど…やっと伝えられた～！',
            'task-select-10': '今日も連絡ありがとう✨正直俺は今日、疲れてて\nスキンケアサボろうとしてたんだけど、○○が連絡くれたから、やる気出た！',
            'task-select-11': '続けてるのすごい！日頃のケアの成果出てますよ！\n○○がお店に来てくれると、空気が華やかになるよねって、今日みんなで話してたんですよ✨',
            'task-select-12': 'ちょっと正直、今、気持ちに余裕が無かったんだけど、○○に連絡もらって、深呼吸の事思い出せました💦ありがとう！'
        },
        categoryGeneric: {
            care: [
                '自分を労わる時間、大切にできて良かったです。…○○が元気だと、俺も嬉しくなるな😊',
                '他人だけじゃなくて、自分自身にも時間を使って優しくできる所、すごくいいな！って思います😄'
            ],
            active: [
                '○○の前向きに取り組む姿勢、ほんとにいいなって思います。俺も最近○○の前向きな所、うつってきたかも👍',
                '続けられてるの、本当に偉い✨でも無理はしないでくださいね！'
            ]
        },
        superGeneric: [
            '報告してくれてありがとう！四六時中一緒にいる訳じゃないのに、ずっと2人で頑張ってる感じがして\n俺、今日も頑張れるよ😊',
            'また一歩進めたね！○○自身は気づいてないかもしれないけど、どんどん綺麗になってる👍心配になるくらい…。'
        ]
    },

ver4: {
    individual: {
        'task-select-1': '朝一番の白湯、続いてるね。ささやかな習慣をコツコツ続けてるの、ひたむきで応援したくなる✊',
        'task-select-2': '間食の誘惑に勝ったんだね！でも、２人で会う時くらいはご褒美でスイーツ食べよう😊',
        'task-select-3': 'だいぶ習慣づいてきたね！俺は今、レモンのスイーツを考案中なんだ✨今度○○に味の感想、聞かせてほしいな。',
        'task-select-4': '寝る前のスマホ、休めたんだね👍この前、ちょうど寝る前に○○がその報告してくれたせいか\n夢で○○と会えたよ！',
        'task-select-5': '一カ所だけでも手を付けると、気づいたら色んなところ片づけてること無い？俺の部屋、お客さん呼べるレベルになったから、今度遊びに来てほしいな✨',
        'task-select-6': '○○が、誰を思い出したのか気になる…なんて…変なこと言ってるよね、忘れてください💦',
        'task-select-7': 'ストレッチも筋肉を意識して真剣にやると、結構疲れるよね。水分取ってゆっくりしてね。お疲れ様！',
        'task-select-8': '○○は自分の事、怠け者だって言ってたけど、全然そんなこと無いよ！今日だって階段選んでる😊',
        'task-select-9': '姿勢が綺麗だと、美人な人はより美人に見えるよね。\n俺、なんか心配になってきた。○○あんまり頑張りすぎないで💦',
        'task-select-10': 'スキンケア、お疲れ様😌\n○○が\nますます綺麗になるから、俺、少し焦ってるかも…。',
        'task-select-11': '続いてるね～👍\nところで、この前すっごくいい香りのハンドクリーム見つけたんだ！買い過ぎたから、今度あげるね。',
        'task-select-12': '深呼吸すると、落ち着くよね。…俺は最近○○と一緒にいるとなんか落ち着くんだ😌'
    },
    categoryGeneric: {
        care: [
            'そうやって自分を大切にケアする○○、本当に素敵だな。…俺も○○の事、大切にしたいな。',
            '体も心も、ちゃんと自分でケアしてるのって『大人』って感じする。でも、俺にももっと何か○○に出来る事があったら嬉しいな😊'
        ],
        active: [
            '○○、どんどん変わっていくね！でも、俺だって負けてないぞ😉',
            '○○は、本当に頑張り屋さんだね。\n\nその姿勢が、周りの人を動かしてると思う。\n\n俺も動かされた内の一人だよ！'
        ]
    },
    superGeneric: [
        '○○は、本当に頑張り屋だね！○○の努力、俺が一番よく知ってるから✊',
        'お疲れ様。これからもお互い励まし合って頑張ろうね👍\n\nでも、改めて出会った頃に比べてこんなに仲良くなれるなんて夢みたいに思える。\n\n正直○○に憧れてたから。\n\nいきなり変な事言ってごめん。でも本心だよ。'
    ]
}
};
// ===============================================
// メッセージ表示：サボり検知セリフ
// ===============================================

const SABORI_DIALOGUES = [
    { id: 2, text: '俺、今日は自分の目標に全敗しました。○○にメッセージを送る資格、ないかもしれませんね。でも、ダメだったときでも○○なら報告しても受け止めてくれるかな、なんて…。甘えすぎですね💦' },
    { id: 3, text: '言い辛いんですが、今日は自分のルーティンが全然ダメで…。さっきまで少し落ち込んでました。でも『休むのもセルフケアのうち』ってことで、ゆるく続けるのも俺たちらしいですよね！' },
    { id: 4, text: '白状します！今日の俺、自分との約束をひとつも守れませんでした…。もし○○も今日は捗らなかったなら、このことは二人だけの秘密にして、明日からまたリスタートしましょう。' },
    { id: 5, text: '今日は自分のルーティン、どうしてもやる気にならなくて全滅でした…。たまにはこういう日があってもいいですよね。明日、今日できなかった分をちょっとだけ一緒に頑張りませんか？' },
    { id: 1, text: '…実は俺、今日やろうと思ってた自分のルーティン、一つもできなかったんです。でも一番格好悪い所を知られたくない○○にあえて白状しました。明日から気合い入れるので、懲りずに応援してくれたら嬉しいです。' },
];

// サボり検知セリフの表示済み管理
function getSaboriLog() {
    return JSON.parse(localStorage.getItem('saboriDialogueLog') || '{"shown":[]}');
}

function saveSaboriLog(log) {
    localStorage.setItem('saboriDialogueLog', JSON.stringify(log));
}
function getSlotDialogueLog() {
    return JSON.parse(localStorage.getItem('slotDialogueLog') || '{"shown":[]}');
}

function saveSlotDialogueLog(log) {
    localStorage.setItem('slotDialogueLog', JSON.stringify(log));
}
function getTaskReactionDialogueLog() {
    return JSON.parse(localStorage.getItem('taskReactionDialogueLog') || '{"shown":[]}');
}
function saveTaskReactionDialogueLog(log) {
    localStorage.setItem('taskReactionDialogueLog', JSON.stringify(log));
}
function getTaskReactionCandidates(reportedTask) {
    const selectedTasks = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
    const selectedTaskIds = JSON.parse(localStorage.getItem('selectedTaskIds') || '[]');
    const taskIndex = selectedTasks.indexOf(reportedTask);
    const taskId = taskIndex !== -1 ? selectedTaskIds[taskIndex] : null;
    const category = TASK_REACTION_CATEGORY_MAP[taskId];
    const version = getMobuVersion();
    const dialogueSet = TASK_REACTION_DIALOGUES[version];
    const candidates = [];

    const individualText = dialogueSet.individual[reportedTask];
    if (individualText) candidates.push(individualText);

    const categoryTexts = dialogueSet.categoryGeneric[category] || [];
    candidates.push(...categoryTexts);

    candidates.push(...dialogueSet.superGeneric);

    return candidates;
}
function getMoodTimeSlot() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 19) return 'afternoon';
    if (hour >= 19 || hour < 2) return 'night';
    return 'midnight';
}

const moodQuestionDialogues = {
    ver1: {
        morning: [
            "でも...何かを新しく始めても習慣化するまでちょっと大変ですよね😊無理はしないでくださいね！今日の○○はどんな感じですか？",
            "それはそうと、何か新しい習慣ってワクワクしませんか？\n俺は今すごくワクワクしてます😊\n○○はどんな気持ちですか？"
        ],
        afternoon: [
            "実は最近少し落ち込む事があったんです…。\nでも、○○が連絡くれたから、元気出ました！\n\n○○は最近どんな感じですか？",
            "それにしても\n小さい事でも、達成感って感じるものですよね！\n○○はどう感じてます？"
        ],
        night: [
            "あの…連絡いただけて、すごく嬉しかったです✨○○は今、どんな気分ですか？",
            "あの…ふと○○は今日、どんな風にすごされたのかなって気になってしまって🙂今、どんな気分ですか？"
        ]
    },
    ver2: {
        
        morning: [
            "少しずつですけど、新しく始めた習慣が馴染んできた気がしますね！\nなんか俺、楽しくなってきた✨○○はどんな気持ちですか？",
            "それはそうと、タスクこなすのもそろそろ慣れてきました？\n慣れてきた頃に疲れが出やすいんですよね😮‍💨\n○○は大丈夫？"
        ],
        afternoon: [
            "俺、今日はバタバタしてたんですけど、○○から通知が来ると、やっぱりホッとしますね😌○○は今どんな気分ですか？",
            "ところで、この時間って何となくちょっと一息つきたくなりますよね🍵○○は今、どんな気分で過ごしてますか？"
        ],
        night: [
            "やっぱり1つでも「できた」があると、どんな日でもちょっと気分上がりますよね～😊○○は、今どんな気分ですか？",
            "夜静かになると、ちょっと先の事、考える事ないですか？俺、○○と一緒に頑張り始めて明日が来るのが楽しみになってきたんです🙂○○は今、どんな気持ちで過ごしてますか？"
        ]
    },
    ver3: {
        morning: [
            "それはそうと、そろそろ本格的に習慣化してきたかも？😄でも慣れてきた頃に疲れが出やすいんですよね。○○は元気？",
            "話は変わるけど俺も自分のタスク続けてると、たまに「このまま続けると自分はどんな風に変われるんだろう」って\n…俺、最近少し未来の事考えるとワクワクするんです！\n○○は今どんな気持ち？"
        ],
        afternoon: [
            "ところで○○って、最近雰囲気変わった気がする。今どんな気分なのか気になるな…。",
            "連絡くれてありがとう。なんか元気出てきた。○○は調子どうですか？"
        ],
        night: [
            "ところで俺、こんな風に○○と連絡取れるの、嬉しくて…☺️理由が何であれ、○○も嬉しい気持ちだったらいいな！今、どんな気持ち？",
            "そろそろ習慣化した事が、変化として現れて、達成感を感じてくる頃じゃない？今○○はどんな感じ？"
        ]
    },
    ver4: {
        morning: [
            "最近は過去より未来の事考える事が増えたんだ。前より前向きになれた気がする。○○は今、どんな気持ち？",
            "そういえば最近、見かけないけど忙しい？元気？🙂"
        ],
        afternoon: [
            "でも、ここまで来るのに結構すごい事だよ！無理してない？辛い時は教えてほしいな。○○は今どんな感じ？",
            "こうして習慣を共有するのも、当たり前になってきたね。\n\n俺は、それがうれしい…。○○は今どんな気持ち？"
        ],
        night: [
            "俺、寝る前に最近嬉しかった事を思い出すのが日課なんだ👍これやると幸せな気持ちで寝れるんだよね！○○は今どんな気持ち？",
            "最近、気付いたら○○何してるかな？って考えてるよ。○○は今日どんな一日だった？"
        ]
    }
};
function pickTaskReactionDialogue(reportedTask) {
    const candidates = getTaskReactionCandidates(reportedTask);
    const log = getTaskReactionDialogueLog();

    let available = candidates.filter(text => !log.shown.includes(text));

    if (available.length === 0) {
        const lastShown = log.shown[log.shown.length - 1];
        log.shown = log.shown.filter(text => !candidates.includes(text));
        available = candidates.length <= 1 ? candidates : candidates.filter(text => text !== lastShown);
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    log.shown.push(chosen);
    saveTaskReactionDialogueLog(log);
    return chosen;
}
function pickRecoveryDialogue(version, level) {
    const dialogueData = recoveryDialogues[version];
    const candidates = dialogueData ? dialogueData[level] : null;
    if (!candidates || candidates.length === 0) return null;
    const logKey = `recoveryDialogueLog_${version}_${level}`;
    let shown = JSON.parse(localStorage.getItem(logKey) || '[]');
    let available = candidates.filter(text => !shown.includes(text));
    if (available.length === 0) {
        shown = [];
        available = candidates;
    }
    const chosen = available[Math.floor(Math.random() * available.length)];
    shown.push(chosen);
    localStorage.setItem(logKey, JSON.stringify(shown));
    return chosen;
}

function handleBannerAwareTaskReport(reportedTask, userTaskReportText, initialDelay, shouldGlowBackButton) {
    const slotInfoRaw = localStorage.getItem('currentBannerSlotInfo');
    let bannerText;
    if (slotInfoRaw && JSON.parse(slotInfoRaw).slot === 'sabori') {
        const saboriPending = JSON.parse(localStorage.getItem('saboriPendingDialogue') || 'null');
        bannerText = saboriPending ? saboriPending.text : getCurrentBannerText();
    } else if (localStorage.getItem('currentBannerIsPeriodic') === 'true') {
        const fixedResult = getFixedSlotDialogue();
        bannerText = fixedResult ? fixedResult.text : getCurrentBannerText();
        if (fixedResult) {
            addToSlotDialogueHistory(fixedResult.text);
        }
    } else {
        bannerText = getCurrentBannerText();
    }
    appendLineMessage('mobu', bannerText, initialDelay);
    initialDelay += 1500;
    if (slotInfoRaw) {
        const slotInfo = JSON.parse(slotInfoRaw);
        markSlotAsTapped(slotInfo.slot, slotInfo.date);
    }
    localStorage.setItem('lastBannerReadTime', Date.now().toString());

    showGenericStampReplySelector(function(stampSrc) {
        appendUserStampMessage(stampSrc);

        const bannerEl = document.getElementById('fake-notification-banner');
        if (bannerEl) {
            bannerEl.classList.remove('show');
        }

        let delay = 500;
        appendLineMessage('user', 'ところで', delay);
        delay += 1000;
        appendLineMessage('user', userTaskReportText, delay);
        delay += 1000;

        const nickname = localStorage.getItem('nickname') || 'あなた';
        const taskReactionText = pickTaskReactionDialogue(reportedTask).replace(/○○/g, nickname);
        appendLineMessage('mobu', taskReactionText, delay);
        delay += 1000;
        setTimeout(() => {
        if (getMoodTimeSlot() !== 'midnight' && getTotalTasksCompleted() < 40 && Math.random() < 0.3) {
            startMoodSharing(shouldGlowBackButton);
        } else {
            if (shouldGlowBackButton) {
                window.startBackButtonGlowTimer(taskReactionText.length, 1000);
            }
            checkAndSetupEvent();
        }
    }, delay + 1000);
});
}
// 次に表示すべきサボり検知セリフを1つ返す
function getNextSaboriDialogue() {
    const log = getSaboriLog();
    const shown = log.shown;

    // ②③④⑤が全部出ていない間は①を除外
    const unlocked2345 = [2, 3, 4, 5].every(id => shown.includes(id));
    const candidates = SABORI_DIALOGUES.filter(d => {
        if (d.id === 1 && !unlocked2345) return false;
        return !shown.includes(d.id);
    });

    // 全部出し切ったらリセット（①も含めて最初から）
    if (candidates.length === 0) {
        log.shown = [];
        saveSaboriLog(log);
        return SABORI_DIALOGUES.find(d => d.id === 2);
    }

    // ランダムで1つ選ぶ
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    log.shown.push(chosen.id);
    saveSaboriLog(log);
    return chosen;
}
function checkAndShowSaboriBanner() {
    if (getMobuState() !== 'normal') {
        checkAndShowHomeBanners();
        return;
    }
    const pendingRaw = localStorage.getItem('saboriPendingDialogue');
    if (pendingRaw) {
        const pending = JSON.parse(pendingRaw);
        const isRead = localStorage.getItem('tappedSlot_' + pending.date + '_sabori') === 'true';
        if (!isRead) {
            showFakeNotification('モブ君', pending.text, getMobuIconSrc(), 'periodic', null, { slot: 'sabori', date: pending.date });
            return;
        }
        localStorage.removeItem('saboriPendingDialogue');
    }
    const currentHour = new Date().getHours();
    const isSaboriTimeWindow = currentHour >= 21 && currentHour < 24;
    const completed = getCompletedToday();
    const isZero = !completed || completed.taskIndices.length === 0;
    if (isSaboriTimeWindow && isZero && getMobuVersion() === 'ver1' && localStorage.getItem('saboriShownDate') !== getGameDate()) {
        const saboriDialogue = getNextSaboriDialogue();
        if (saboriDialogue) {
            const nickname = localStorage.getItem('nickname') || 'あなた';
            const text = saboriDialogue.text.replace(/○○/g, nickname);
            const today = getGameDate();
            showFakeNotification('モブ君', text, getMobuIconSrc(), 'periodic', null, { slot: 'sabori', date: today });
            localStorage.setItem('saboriPendingDialogue', JSON.stringify({ date: today, text: text }));
                        localStorage.setItem('saboriShownDate', today);
            return;
        }
    }
    checkAndShowHomeBanners();
}
const TASK_REACTION_CATEGORY_MAP = {
    'task-select-1': 'care',
    'task-select-2': 'care',
    'task-select-3': 'care',
    'task-select-4': 'care',
    'task-select-5': 'active',
    'task-select-6': 'care',
    'task-select-7': 'active',
    'task-select-8': 'active',
    'task-select-9': 'active',
    'task-select-10': 'care',
    'task-select-11': 'care',
    'task-select-12': 'care'
};
// ===============================================
// メッセージ表示：セリフプール構築＋抽選
// ===============================================
function addToSlotDialogueHistory(text) {
    const slotLog = getSlotDialogueLog();
    slotLog.shown.push(text);
    if (slotLog.shown.length > 7) {
        slotLog.shown.shift();
    }
    saveSlotDialogueLog(slotLog);
}
function pickDialogue() {
    const nickname = localStorage.getItem('nickname') || 'あなた';
    const selectedTaskIds = JSON.parse(localStorage.getItem('selectedTaskIds') || '[]');
    if (selectedTaskIds.length === 0) return null;

    const slot = getCurrentTimeOfDay();

    // 選択中タスクに紐づくセリフを時間帯で絞り込む
    const pool = SLOT_DIALOGUES.filter(d => {
        if (!selectedTaskIds.includes(d.taskId)) return false;
        if (d.type === 'all') return true;
        if (slot === 'morning' && d.type === 'morning') return true;
        if (slot === 'afternoon' && d.type === 'afternoon') return true;
        if (slot === 'night' && d.type === 'night') return true;
        return false;
    });

    // 既出セリフを除外し、全部出た場合は既出リストをリセットする
    const slotLog = getSlotDialogueLog();
    let availablePool = pool.filter(d => !slotLog.shown.includes(d.text));
    if (availablePool.length === 0) {
        slotLog.shown = [];
        availablePool = pool;
    }

    // 夜スロット＋その日の完了0件ならサボり検知セリフを均等確率で合算


    if (availablePool.length === 0) return null;

    // ランダムで1つ抽選
    const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];


    return {
        text: chosen.text.replace(/○○/g, nickname),
        displayTime: chosen.displayTime
    };
}

function getCurrentTimeOfDay() {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 11) {
        return 'morning'; // 朝 (4:00 - 10:59)
    } else if (currentHour >= 11 && currentHour < 17) {
        return 'afternoon'; // 昼 (11:00 - 16:59)
    } else {
        return 'night'; // 夜 (17:00 - 3:59)
    }
}

/**
 * ユーザーが返信スタンプを送信した演出を行う
 * @param {string} stampSrc - 送信するスタンプ画像のパス
 */
function appendUserStampMessage(stampSrc) {
    const chatArea = document.querySelector('#screen-line .line-chat');
    if (!chatArea) return;

    playSE('se_stamp_send.mp3'); // スタンプ送信音

    const messageDiv = document.createElement('div');
    // 既存の user スタイルを流用しつつ、スタンプ用に調整
    messageDiv.className = 'line-message user new'; 
    messageDiv.style.padding = '0';
    messageDiv.style.backgroundColor = 'transparent';
    messageDiv.style.width = 'fit-content'; // 内容に幅を合わせる

    const stampImg = document.createElement('img');
    stampImg.src = stampSrc;
    stampImg.style.width = '100px';
    stampImg.style.height = '100px';

    messageDiv.appendChild(stampImg);
    chatArea.appendChild(messageDiv);

    // チャットを最下部にスクロール
    chatArea.scrollTop = chatArea.scrollHeight;

    // アニメーションが終わったらクラスを削除
    messageDiv.addEventListener('animationend', () => {
        messageDiv.classList.remove('new');
    });
}

/**
 * 気分共有以外の場面共通の「5種類スタンプ選択」を表示する
 * @param {function} onStampSelected 選ばれたスタンプのsrcを受け取って実行する処理
 */
function showGenericStampReplySelector(onStampSelected) {
    const inputBar = document.getElementById('line-input-bar');
    const replyArea = document.getElementById('notification-reply-area');
    const genericSelector = document.getElementById('generic-stamp-selector');

    inputBar.style.display = 'none';
    replyArea.style.display = 'none';
    genericSelector.style.display = 'grid';

    const activeStamps = genericSelector.querySelectorAll('.generic-stamp');
    activeStamps.forEach(stamp => {
        const clonedStamp = stamp.cloneNode(true);
        stamp.parentNode.replaceChild(clonedStamp, stamp);
        clonedStamp.addEventListener('click', function() {
            genericSelector.style.display = 'none';
            onStampSelected(clonedStamp.src);
        }, { once: true });
    });
}

// ===============================================
// Cafe Scene Data (カフェシーンの設計図)
// ===============================================
const cafeEventData = {
    // ① 初回起動時のイベントデータ (ブロック0)
    'introduction_start': [
      {
        image: 'assets/images/mobu_v1_cafe_welcome.png', // 仮の画像名
        dialogue: '（ユーザー名）、いらっしゃいませ。今日も来てくれて嬉しいです。いつもの席でよろしいですか？'
      },
      {
        image: 'assets/images/mobu_v1_cafe_thinking.png', // 仮の画像名
        dialogue: 'あ、そういえば（ユーザー名）。前に『習慣作り』の話をされてましたよね？俺も最近ずっと考えているんです。また後で、何か面白い情報があったら教えてくださいね！'
      }
    ],
  
    // ② タスク選択後の動機付けイベントデータ (ブロックA〜C)
    'introduction_motivation': [
      {
        image: 'assets/images/mobu_v1_cafe_motivation_A.png', // 仮の画像名
        dialogue: 'あ、その音って今話題の『自分磨きアプリ』の音ですか？実は俺も、最近何かを習慣にしたくて気になってたんです。'
      },
      {
        image: 'assets/images/mobu_v1_cafe_motivation_B.png', // 仮の画像名
        dialogue: 'でも、俺にはアプリのデザインがかわいらしすぎて、結局ダウンロードはしなかったんだけど...やっぱり本気で自分磨きは始めたくて。'
      },
      {
        image: 'assets/images/mobu_v1_cafe_motivation_C.png', // 仮の画像名
        dialogue: 'だから…俺も一緒に自分磨き、始めていいですか？誰かと一緒なら頑張れる気がするんです。返信しなくてもいいので、習慣が俺に定着するまでは、（ユーザー名）にメッセージ送ってもいいですか？送らせてもらえたら嬉しいです。'
      }
    ],
  
    // ③ 初回タスク報告後のイベントデータ (ブロックD〜E)
    'first_report': [
      {
        image: 'assets/images/mobu_v1_cafe_report_A.png', // 仮の画像名
        dialogue: '（ユーザー名）、お疲れ様。そのスマホかわいいですね。あ、もしかして今、この前話してたアプリやってます...？俺、自分磨きの習慣スタートして思い始めたんだけど...自分磨きって、達成してもなかなか誰かに褒めてもらえないじゃないですか？それで、結果もなかなか目に見えなかったらモチベ落ちていきません？'
      },
      {
        image: 'assets/images/mobu_v1_cafe_report_B.png', // 仮の画像名
        dialogue: 'だから...タスクが終わって達成感を誰かに伝えたい時は、俺を頼ってほしい。いつでも俺に報告してください。一番に応援するから。自分磨きっていう共通の事で、俺も（ユーザー名）の役に立てたらなって！'
      },
      {
        image: 'assets/images/mobu_v1_cafe_report_C.png', // 仮の画像名
        dialogue: 'あ、俺用事あるの忘れてた！じゃあ、また！'
      }
    ]
};

/**
 * ユーザーが選択中のタスクに対応するセリフをランダムで1つ選んでIINEバナーを表示する
 */
// ===============================================
// メッセージ表示：アプリ起動時の呼び出し
// ===============================================
// ===============================================
// 表1：オネェ化バナー表示関数
// ===============================================
// ===============================================
// 表2：翌通知バナー表示関数
// ===============================================

const recoveryFollowUpDialogues = {
    ver1: {
        lv1: [
            "最近までいつもの自分じゃなくなってて、自分でも戸惑ってました🫠 これからは一緒に、自然体で続けていきましょうね！",
            "モブVer.1のオネェLv1の仮セリフ-2",
            "モブVer.1のオネェLv1の仮セリフ-3",
            "モブVer.1のオネェLv1の仮セリフ-4",
            "モブVer.1のオネェLv1の仮セリフ-5",
            "モブVer.1のオネェLv1の仮セリフ-6",
            "モブVer.1のオネェLv1の仮セリフ-7"
        ],
        lv2: [
            "このところの俺、『美の伝道師』に転職しそうだったから、助かった😂○○が頑張る姿が俺の一番の励みです。一緒にペース戻していきましょう！",
            "モブVer.1のオネェLv2の仮セリフ-2",
            "モブVer.1のオネェLv2の仮セリフ-3"
        ],
        lv3: [
            "○○が再開してくれたから、俺もいつもの調子に戻れました🤣これからはまたいつもの俺たちのペースで、続けていきましょう！",
            "モブVer.1のオネェLv3の仮セリフ-2"
        ]
    },
    ver2: {
        lv1: [
            "モブVer.2のオネェLv1の仮セリフ-1",
            "モブVer.2のオネェLv1の仮セリフ-2",
            "モブVer.2のオネェLv1の仮セリフ-3",
            "モブVer.2のオネェLv1の仮セリフ-4",
            "モブVer.2のオネェLv1の仮セリフ-5",
            "モブVer.2のオネェLv1の仮セリフ-6",
            "モブVer.2のオネェLv1の仮セリフ-7"
        ],
        lv2: [
            "モブVer.2のオネェLv2の仮セリフ-1",
            "モブVer.2のオネェLv2の仮セリフ-2",
            "モブVer.2のオネェLv2の仮セリフ-3"
        ],
        lv3: [
            "モブVer.2のオネェLv3の仮セリフ-1",
            "モブVer.2のオネェLv3の仮セリフ-2"
        ]
    },
    ver3: {
        lv1: [
            "モブVer.3のオネェLv1の仮セリフ-1",
            "モブVer.3のオネェLv1の仮セリフ-2",
            "モブVer.3のオネェLv1の仮セリフ-3",
            "モブVer.3のオネェLv1の仮セリフ-4",
            "モブVer.3のオネェLv1の仮セリフ-5",
            "モブVer.3のオネェLv1の仮セリフ-6",
            "モブVer.3のオネェLv1の仮セリフ-7"
        ],
        lv2: [
            "モブVer.3のオネェLv2の仮セリフ-1",
            "モブVer.3のオネェLv2の仮セリフ-2",
            "モブVer.3のオネェLv2の仮セリフ-3"
        ],
        lv3: [
            "モブVer.3のオネェLv3の仮セリフ-1",
            "モブVer.3のオネェLv3の仮セリフ-2"
        ]
    },
    ver4: {
        lv1: [
            "モブVer.4のオネェLv1の仮セリフ-1",
            "モブVer.4のオネェLv1の仮セリフ-2",
            "モブVer.4のオネェLv1の仮セリフ-3",
            "モブVer.4のオネェLv1の仮セリフ-4",
            "モブVer.4のオネェLv1の仮セリフ-5",
            "モブVer.4のオネェLv1の仮セリフ-6",
            "モブVer.4のオネェLv1の仮セリフ-7"
        ],
        lv2: [
            "モブVer.4のオネェLv2の仮セリフ-1",
            "モブVer.4のオネェLv2の仮セリフ-2",
            "モブVer.4のオネェLv2の仮セリフ-3"
        ],
        lv3: [
            "モブVer.4のオネェLv3の仮セリフ-1",
            "モブVer.4のオネェLv3の仮セリフ-2"
        ]
    }
};
let isRecoveryFollowUpShowing = false;
function getRecoveryFollowUpLog(version, level) {
    const key = `recoveryFollowUpLog_${version}_${level}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : { shown: [] };
}

function saveRecoveryFollowUpLog(version, level, log) {
    const key = `recoveryFollowUpLog_${version}_${level}`;
    localStorage.setItem(key, JSON.stringify(log));
}
function showRecoveryFollowUpNotification() {
    if (isRecoveryFollowUpShowing) return;

    // 新しい仕様のフラグをチェック (仕様書 5-1)
    if (!getIsWaitingForRecoveryPhase2()) return;

    isRecoveryFollowUpShowing = true;

    // 放置日数（abandonDays）に基づいてセリフのレベルを決定 (仕様書 3-1)
    // これは復帰フォローアップバナー専用、ステップ3の値とは別物
    const days = parseInt(localStorage.getItem('lastAbandonDaysBeforeReset') || '0', 10);
    const version = getMobuVersion();
    let level = 'lv1';
    if (days >= 10) level = 'lv3';
    else if (days >= 4) level = 'lv2';

    const nickname = localStorage.getItem('nickname') || 'あなた';
    const pool = recoveryFollowUpDialogues[version] && recoveryFollowUpDialogues[version][level];
    if (!pool) {
        isRecoveryFollowUpShowing = false;
        return;
    }
    const log = getRecoveryFollowUpLog(version, level);
    let available = pool.filter(text => !log.shown.includes(text));
    if (available.length === 0) {
        const lastShown = log.shown[log.shown.length - 1];
        log.shown = log.shown.filter(text => !pool.includes(text));
        available = pool.length <= 1 ? pool : pool.filter(text => text !== lastShown);
    }
    const raw = available[Math.floor(Math.random() * available.length)];
    log.shown.push(raw);
    saveRecoveryFollowUpLog(version, level, log);

    const message = raw.replace(/○○/g, nickname);

    // バナータップまでフラグは消さない（仕様書 5-3 遵守）
    setTimeout(() => { isRecoveryFollowUpShowing = false; }, 3000);
    showFakeNotification('モブ君', message, getMobuIconSrc(), 'recovery');
}
// ===============================================
// 表3：シネマティック演出表示関数
// ===============================================
function getCinematicDialogueLog() {
    return JSON.parse(localStorage.getItem('cinematicDialogueLog') || '{}');
}
function saveCinematicDialogueLog(log) {
    localStorage.setItem('cinematicDialogueLog', JSON.stringify(log));
}
function showCinematicScene(ver, level) {
    const nickname = localStorage.getItem('nickname') || 'あなた';
    const verKey = 'ver' + ver;
    const levelKey = 'onee_lv' + level;

   const rawSets = cinematicDialogues[verKey] && cinematicDialogues[verKey][levelKey];
    if (!rawSets || rawSets.length === 0) return;
    const patternKey = verKey + '_' + levelKey;
    const indexes = rawSets.map((set, i) => i);
    const log = getCinematicDialogueLog();
    log[patternKey] = log[patternKey] || [];
    let available = indexes.filter(i => !log[patternKey].includes(i));
    if (available.length === 0) {
        const lastShown = log[patternKey][log[patternKey].length - 1];
        log[patternKey] = log[patternKey].filter(i => !indexes.includes(i));
        available = indexes.length <= 1 ? indexes : indexes.filter(i => i !== lastShown);
    }
    const chosenIndex = available[Math.floor(Math.random() * available.length)];
    log[patternKey].push(chosenIndex);
    saveCinematicDialogueLog(log);
    const rawLines = rawSets[chosenIndex];
    const lines = rawLines.map(line => line.replace(/○○/g, nickname));

    showScreen('screen-cinematic');
const cinematicBg = document.querySelector('.cinematic-bg');
if (cinematicBg) {
    cinematicBg.className = 'cinematic-bg ver' + ver;
}

    const subtitleEl = document.getElementById('cinematic-subtitle');
    let currentIndex = 0;

    subtitleEl.textContent = lines[0];

    const cinematicScreen = document.getElementById('screen-cinematic');

    function handleTap() {
        currentIndex++;
        if (currentIndex < lines.length) {
            subtitleEl.style.opacity = '0';
            setTimeout(() => {
                subtitleEl.textContent = lines[currentIndex];
                subtitleEl.style.transition = 'opacity 0.4s';
                subtitleEl.style.opacity = '1';
            }, 300);
        } else {
            cinematicScreen.removeEventListener('click', handleTap);
            playBlinkVideo(() => {
                showScreen('screen-home');
            });
        }
    }

    cinematicScreen.addEventListener('click', handleTap);
}
/**
 * ホーム画面表示時のバナー優先順位制御をまとめた関数
 */
function showRestartConfirmPopup() {
    const popup = document.getElementById('restart-confirm-popup');
    if (!popup) return;
    popup.style.display = 'flex';
    const confirmBtn = document.getElementById('restart-popup-confirm-button');
    const cancelBtn = document.getElementById('restart-popup-cancel-button');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    newConfirmBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        const blocker = document.getElementById('epilogue-input-blocker');
        blocker.style.display = 'block';
        resetAllData();
        playBlinkVideo(() => {
            showScreen('screen-welcome');
        });
    }, { once: true });
    newCancelBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    }, { once: true });
}
function showEpilogueReadyPopup() {
    if (!isEpilogueReadyPending()) return;

    const popup = document.getElementById('epilogue-ready-popup');
    if (!popup) return;

    popup.style.display = 'flex';

    const continueBtn = document.getElementById('epilogue-popup-continue-button');
    const stayBtn = document.getElementById('epilogue-popup-stay-button');

    const newContinueBtn = continueBtn.cloneNode(true);
    continueBtn.parentNode.replaceChild(newContinueBtn, continueBtn);

    const newStayBtn = stayBtn.cloneNode(true);
    stayBtn.parentNode.replaceChild(newStayBtn, stayBtn);

    newContinueBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        playFadeTransition(() => {
            startEndingSequence();
        });
    }, { once: true });

    newStayBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    }, { once: true });
}

function checkAndShowHomeBanners() {
    const lastReadTime = parseInt(localStorage.getItem('lastBannerReadTime') || '0', 10);
    if (Date.now() - lastReadTime < 30 * 60 * 1000) return;
    const existingBanner = document.getElementById('fake-notification-banner');
    if (existingBanner && existingBanner.classList.contains('show')) {
        return;
    }
    if (localStorage.getItem('showFirstHomeBanner') === 'true') {
        const nickname = localStorage.getItem('nickname') || 'あなた';
        const message = `さっきはありがとうございました😊俺、これから${nickname}と一緒に頑張れると思うとワクワクしてます！`;
        showFakeNotification('モブ君', message, getMobuIconSrc(), 'first_home');
        return;
    }
    if (isEpilogueReadyPending()) return;
    if (showReturnBannerIfNeeded()) return;
    if (getIsWaitingForRecoveryPhase2()) {
        showRecoveryFollowUpNotification();
        return;
    }

    const mobuState = getMobuState();
    if (mobuState !== 'normal') {
        discardPendingBanners();
        handleAppLaunchNotification();
        return;
    }

    const pendingBannersList = getPendingBanners();
    if (pendingBannersList.length > 0) {
        const nextPending = pendingBannersList[0];
        showFakeNotification('モブ君', nextPending.text, getMobuIconSrc(), 'periodic', null, { slot: nextPending.slot, date: nextPending.date });
        return;
    }

    showSlotMessage();
}

function isBannerCurrentlyShown() {
    const banner = document.getElementById('fake-notification-banner');
    return banner ? banner.classList.contains('show') : false;
}
function getCurrentBannerText() {
    const messageEl = document.getElementById('notification-message');
    return messageEl ? messageEl.textContent : '';
}
function showSlotMessage() {
    if (hasShownInCurrentSlot()) return;
// 未読の保留バナーがあれば、新しいセリフの抽選を止める
    if (getPendingBanners().length > 0) return;
    
        // オネェ状態（サボり中）なら通常メッセージは表示しない
    if (getMobuState() !== 'normal') return;
if (getMobuVersion() !== 'ver1') return;

    let result = getFixedSlotDialogue();
    if (!result) {
        result = pickDialogue();
        if (!result) return;
        saveFixedSlotDialogue(result.text, result.displayTime);
    }

    markSlotAsViewed(getCurrentTimeOfDay(), getGameDate());

    const timestampEl = document.getElementById('notification-timestamp');
    if (timestampEl) {
        timestampEl.textContent = result.displayTime === 'now' ? '今' : result.displayTime;
    }

    showFakeNotification('モブ君', result.text, getMobuIconSrc(), 'periodic');
}
/*function showPeriodicIineNotification() {
    const nickname = localStorage.getItem('nickname') || 'あなた';

    // ユーザーが選択中のタスクIDを取得
    const selectedTaskIds = Array.from(
        document.querySelectorAll('.task-select-checkbox:checked')
    ).map(el => el.id);

    if (selectedTaskIds.length === 0) return;

    // 選択中タスクに対応するセリフだけに絞る
    const candidates = periodicNotificationDialogues.filter(d =>
        selectedTaskIds.includes(d.taskId)
    );
    if (candidates.length === 0) return;

    // 表示済みリストを取得
    const seenKey = 'iine_seen_indices';
    let seen = JSON.parse(localStorage.getItem(seenKey) || '[]');

    // 未表示のものに絞る。全部見たらリセット
    let unseen = candidates.filter((_, i) => !seen.includes(candidates.indexOf(_)));
    // ※インデックスはperiodicNotificationDialogues全体の位置で管理
    const candidateIndices = candidates.map(d => periodicNotificationDialogues.indexOf(d));
    const unseenIndices = candidateIndices.filter(i => !seen.includes(i));

    let chosenIndex;
    if (unseenIndices.length === 0) {
        // 全種表示済み → リセット
        seen = [];
        localStorage.setItem(seenKey, JSON.stringify(seen));
        chosenIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
    } else {
        chosenIndex = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
    }

    // 表示済みに追加
    seen.push(chosenIndex);
    localStorage.setItem(seenKey, JSON.stringify(seen));

    const chosen = periodicNotificationDialogues[chosenIndex];

    // ニックネーム置換
    const message = chosen.text.replace(/\$\{nickname\}/g, nickname);

    // タイムスタンプをセット
    const timestampEl = document.getElementById('notification-timestamp');
    if (timestampEl) timestampEl.textContent = chosen.time;

    // バナー表示
    showFakeNotification('モブ君', message, getMobuIconSrc(), 'periodic');
}*/