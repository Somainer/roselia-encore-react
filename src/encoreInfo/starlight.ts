import * as Helper from '../rhodonite/protocols/helpers'
import {Kirin} from './kirin'

const members = Helper.makeMembers([
    {
        name: {
            jp: "愛城華恋",
            cn: "爱城华恋",
            en: "Aijo Karen"
        },
        birthday: "9-27",
        role: "恋哥哥",
        CVName: {
            jp: "小山百代",
            cn: "小山百代",
            en: "Koyama Momoyo"
        },
        horoscope: "天秤",
        encoreColor: "#FB5458",
    },
    {
        name: {
            en: "Kagura Hikari",
            cn: "神乐光",
            jp: "神楽 ひかり"
        },
        CVName: {
            en: "Mimori Suzuko",
            cn: "三森铃子",
            jp: "三森すずこ"
        },
        birthday: "1-8",
        role: "光哥哥",
        horoscope: "摩羯",
        encoreColor: "#6292E9"
    },
    {
        name: {
            "en": "Tendo Maya",
            "cn": "天堂真矢",
            "jp": "天堂真矢"
        },
        birthday: "7-24",
        role: "口合口合",
        horoscope: "狮子",
        encoreColor: "#CBC6CC",
        CVName: {
            en: "Tomita Maho",
            cn: "富田麻帆",
            jp: "富田麻帆"
        },
        external: [
            {
                title: 'THIS IS 标题',
                content: 'THIS IS 内容',
                hidden: false
            },
            {
                title: 'This is...',
                content: 'This is 天堂口合口合',
                hidden: true
            }
        ]
        
    },
    {
        name: {
            en: "Hoshimi Junna",
            cn: "星见纯那",
            jp: "星見純那"
        },
        birthday: "10-1",
        horoscope: "天秤",
        encoreColor: "#95CAEE",
        CVName: {
            en: "Sato Hinata",
            cn: "佐藤日向",
            jp: "佐藤日向"
        }
    },
    {
        name: {
            en: "Tsuyuzaki Mahiru",
            cn: "露崎真昼",
            jp: "露崎まひる"
        },
        birthday: "5-4",
        role: "闹钟",
        horoscope: "金牛",
        encoreColor: "#61BF99",
        CVName: {
            en: "Iwata Haruki",
            cn: "岩田阳葵",
            jp: "岩田陽葵"
        },
        external: [
            {
                title: 'あれは',
                content: ['あれは　闹钟マン，闹钟Man！', '露女士保护协会表示强烈谴责'],
                hidden: true
            }
        ]
    },
    {
        name: {
            en: "Daiba Nana",
            cn: "大场奈奈",
            jp: "大場なな"
        },
        birthday: "7-12",
        role: "bananice",
        horoscope: "巨蟹",
        encoreColor: "#FDD162",
        CVName: {
            en: "Koizumi Moeka",
            cn: "小泉萌香",
            jp: "小泉萌香"
        }
    },
    {
        name: {
            en: "Saijo Claudine",
            cn: "西条克洛迪娜",
            jp: "西條クロディーヌ"
        },
        birthday: "8-1",
        role: "Oui",
        horoscope: "狮子",
        encoreColor: "#FE9952",
        CVName: {
            jp: "相羽あいな",
            cn: "相羽爱奈",
            en: "Aiba Aina"
        }
    },
    {
        name: {
            en: "Isurugi Futaba",
            cn: "石动双叶",
            jp: "石動双葉"
        },
        birthday: "4-17",
        horoscope: "白羊",
        encoreColor: "#8C67AA",
        CVName: {
            jp: "生田輝",
            cn: "生田辉",
            en: "Ikuta Tel"
        }
    },
    {
        name: {
            en: "Hanayagi Kaoruko",
            cn: "花柳香子",
            jp: "花柳香子"
        },
        birthday: "3-3",
        horoscope: "双鱼",
        encoreColor: "#E08696",
        CVName: {
            jp: "伊藤彩沙",
            cn: "伊藤彩沙",
            en: "Itō Ayasa"
        }
    }
])

const singles = Helper.makeTrackOf('single')([
    {
        id: 1,
        title: "プロローグ -Star Divine-",
        track: ["Star Divine", "舞台少女心得", "願いは光になって", "Star Divine［Instrumental］", "舞台少女心得［Instrumental］", "願いは光になって［Instrumental］"],
        releaseDate: "2017-9-20",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/star-divine/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=36303637"
            },
            {
                description: "萌娘百科",
                link: "https://zh.moegirl.org/Star_Divine"
            }
        ],
        hasLimitedEdition: false
    },
    {
        id: 0,
        displayId: '限定',
        title: "プリンシパル -Fancy You-",
        track: ["Fancy You", "GANG☆STAR", "情熱の目覚めるとき", "Fancy You［Instrumental］", "GANG☆STAR［Instrumental］", "情熱の目覚めるとき［Instrumental］"],
        releaseDate: "2017-9-22",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/fancy-you/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=71852703"
            }
        ],
        hasLimitedEdition: false
    },
    {
        id: 2,
        title: "スタァライトシアター",
        track: ["スタァライトシアター", "Circle of the Revue", "キラめきのありか", "スタァライトシアター［Instrumental］", "Circle of the Revue［Instrumental］", "キラめきのありか［Instrumental］"],
        releaseDate: "2018-3-7",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/starlight-theater/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=71852653"
            }
        ]
    },
    {
        id: 0,
        title: "星のダイアローグ",
        displayId: 'OP',
        track: ["星のダイアローグ", "ディスカバリー！", "星のダイアローグ［Instrumental］", "ディスカバリー！［Instrumental］"],
        releaseDate: "2018-7-18",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/star-dialogue/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=71852730"
            }
        ],
        hasLimitedEdition: false
    },
    {
        id: 0,
        displayId: 'ED',
        title: "Fly Me to the Star",
        track: ["Fly Me to the Star", "よろしく九九組", "ロマンティッククルージン", "Fly Me to the Star［Instrumental］", "よろしく九九組［Instrumental］", "ロマンティッククルージン［Instrumental］"],
        releaseDate: "2018-8-1",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/fly-me-to-the-star/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=72071655"
            }
        ]
    },
    {
        id: 0,
        displayId: "舞台1st",
        title: "99 ILLUSION！",
        track: ["99 ILLUSION！", "Green Dazzling Light", "99 ILLUSION！ (Instrumental)", "Green Dazzling Light (Instrumental)"],
        releaseDate: "2018-10-10",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/99-illusion%EF%BC%81/"
            },
            {
                description: "NetEase",
                link: "https://music.163.com/album?id=73471099"
            }
        ]
    },
    {
        id: 5,
        title: "約束タワー",
        track: ["約束タワー", "舞台プレパレイション", "約束タワー［Instrumental］", "舞台プレパレイション［Instrumental］"],
        releaseDate: "2019/1/9",
        links: [
            {
                description: "Revue Starlight",
                link: "https://revuestarlight.com/music/5thsinglecd/"
            },
            {
                description: 'NetEase',
                link: 'https://music.163.com/album?id=75799869'
            }
        ]
    },
    {
        id: 0,
        displayId: '舞台2nd',
        title: '百色リメイン',
        track: ['百色リメイン', 'Bright!Light!', '百色リメイン -instrumental-', 'Bright!Light! -instrumental-'],
        releaseDate: '2019/04/17',
        links: [
            {
                description: 'Revue Starlight',
                link: 'https://revuestarlight.com/music/%E7%99%BE%E8%89%B2%E3%83%AA%E3%83%A1%E3%82%A4%E3%83%B3/'
            },
            {
                description: '百色リメイン【華恋&ひかり&まひるver.】',
                link: 'https://music.163.com/album?id=78618376'
            },
            {
                description: '百色リメイン【双葉&香子ver.】',
                link: 'https://music.163.com/album?id=78618569'
            },
            {
                description: '百色リメイン【純那&ななver.】',
                link: 'https://music.163.com/album?id=78619022'
            },
            {
                description: '百色リメイン【真矢&クロディーヌver.】',
                link: 'https://music.163.com/album?id=78619097'
            }
        ]
    }
])

const siteConfig: Helper.SiteConfig = {
    title: 'Revue Starlight',
    configName: "starlight",
    members,
    singles,
    siteLogo: '/img/starlight/kirin.svg',
    siteFavicon: '/img/starlight/kirin.svg',
    logoSpin: true,
    themeColor: '#5869b1',
    playerUrl: '' && 'https://music.163.com/outchain/player?type=0&id=1999324469&auto=0&height=430',
    bannerImage: {
        foreground: '/img/starlight/mainvisual.png',
        background: '/img/starlight/Intro__bg.jpg'
    },
    getters: {
        trackImageGetter (t) {
            return `/img/starlight/${Helper.capatialize(t.type!)}_${t.displayId || t.id}.jpg`
        },
        limitedTrackImageGetter (t) {
            return `/img/${Helper.capatialize(t.type!)}_${t.id}_lim.jpg`
        },
        memberImageGetter (m) {
            return '' && `/img/member_${m.name.en.split(' ')[1].toLowerCase()}.jpg`
        },
        cvImageGetter (m) {
            return '' && `/img/cv_${Helper.getLastLanguageAttribute(m.CVName).en.split(' ')[1].toLowerCase()}.jpg`
        }
    },
    plugins: {
        member: Kirin
    },
    externalTrackLists: Helper.makeExternalTrackList([
        {
            displayName: {
                cn: '原声带',
                en: 'Original Soundtrack',
                jp: 'オリジナルサウンドトラック'
            },
            trackType: 'ost',
            trackList: [
                {
                    id: 1,
                    title: "少女☆歌劇 レヴュースタァライト",
                    track: ["星摘みのメロディ", "星のおどり場", "ふたりのセレナーデ", "halation", "pied à pied：一歩ずつ", "小鳥のアラベスク", "少女たちのプレリュード", "プロムナード", "starhood", "dot to dot", "歯車", "daydream", "anti daydream", "starlight curtain", "華恋とひかり", "深遠", "キリンのためのワルツ", "キリンのためのアダージョ", "暗転", "カタストロフ", "Elle est belle：美しい人", "rendez-vous：遥かなる約束", "クイックステップダンス", "夢を振りまいて", "子猫のカーニバル", "ランチボックス", "ハッピーインターリュード", "バナナの叩き売り", "ギニョール", "ロンド・ロンド・ロンド", "星摘みの塔", "星罪", "ブリッジの上で", "dawn of the star", "ki-ringtone", "再生産"],
                    releaseDate: "2018-10-17",
                    links: [
                        {
                            description: "Revue Starlight",
                            link: "https://revuestarlight.com/music/ost/"
                        },
                        {
                            description: "NetEase",
                            link: "http://music.163.com/m/album?id=73837093"
                        }
                    ]
                }
            ]
        },
        {
            displayName: {
                cn: '剧中歌',
                en: 'La Revue de',
                jp: '劇中歌'
            },
            trackType: 'ost',
            trackList: [
                {
                    id: 0,
                    displayId: 'Matinée',
                    title: "「少女☆歌劇 レヴュースタァライト」劇中歌アルバムVol.1 「ラ レヴュー ド マチネ」",
                    track: ["世界を灰にするまで", "The Star Knows", "誇りと驕り", "恋の魔球", "花咲か唄", "Fly Me to the Star #3", "Fly Me to the Star #4", "Fly Me to the Star #5", "Fly Me to the Star #6", "Fly Me to the Star #7"],
                    releaseDate: "2018-8-22",
                    links: [
                        {
                            description: "Revue Starlight",
                            link: "https://revuestarlight.com/music/la-revue-de-matinee/"
                        },
                        {
                            description: "NetEase",
                            link: "http://music.163.com/m/album?id=72383717"
                        }
                    ]
                },
                {
                    id: 0,
                    displayId: 'Soirée',
                    title: "「少女☆歌劇 レヴュースタァライト」劇中歌アルバムVol.2 「ラ レヴュー ド ソワレ」",
                    track: ["RE:CREATE", "星々の絆", "-Star Divine- フィナーレ", "舞台少女心得 幕間", "スタァライト", "Fly Me to the Star #8", "Fly Me to the Star #9", "Fly Me to the Star #10", "Fly Me to the Star #11", "星摘みの歌"],
                    releaseDate: "2018-10-17",
                    links: [
                        {
                            description: "Revue Starlight",
                            link: "https://revuestarlight.com/music/la-revue-de-soiree/"
                        },
                        {
                            description: "NetEase",
                            link: "http://music.163.com/m/album?id=73837093"
                        }
                    ]
                }
            ]
        }
    ]),
    bangumiList: [
        {
            name: "少女☆歌剧 Revue Starlight",
            coverImage: '/img/starlight/bangumi/rs1st.jpg',
            releaseDate: '2018/7/13',
            link: 'https://www.bilibili.com/bangumi/media/md102892/',
            meta: '太扭曲了，我喜欢（建议再看舞台剧）'
        }
    ]
}

export default siteConfig