/* ==========================================================================
   청소년기 영양 (교과서 56~59쪽) 퀴즈 데이터셋
   - isCorrect: true  -> 올바른 설명 (살려두어야 함! 때리면 감점 & 라이프 차감)
   - isCorrect: false -> 틀린 설명 (잡아야 할 두더지! 때리면 득점)
   ========================================================================== */

const QUIZ_DATA = {
  // STAGE 1: 영양소의 3대 기능 (에너지 공급 / 신체 조직 구성 / 생리 기능 조절)
  stage1: {
    title: "Stage 1. 영양소의 3대 기능 탐정",
    desc: "영양소의 기능(에너지 공급, 신체 조직 구성, 생리 기능 조절)과 기본 개념을 확인하세요!",
    targetMolesCount: 8, // 잡아야 하는 오답 두더지 수
    questions: [
      // --- 올바른 지식 (TRUE - 때리면 안 됨!) ---
      {
        keyword: "영양",
        statement: "섭취한 식품을 소화·흡수하여 생명 유지, 성장 등에 이용하는 과정이다.",
        isCorrect: true,
        explanation: "맞습니다! '영양'은 식품을 섭취해 소화·흡수하고 몸에 이용하는 전체 과정입니다."
      },
      {
        keyword: "영양소",
        statement: "건강을 유지하고 성장하여 활동하는 데 필요한 식품의 성분이다.",
        isCorrect: true,
        explanation: "맞습니다! 영양소는 식품 속에 들어 있는 성분 자체를 뜻합니다."
      },
      {
        keyword: "에너지 공급",
        statement: "탄수화물, 단백질, 지방은 생명 유지와 활동에 필요한 에너지를 공급한다.",
        isCorrect: true,
        explanation: "맞습니다! 3대 열량 영양소는 탄수화물, 단백질, 지방입니다."
      },
      {
        keyword: "신체 조직 구성",
        statement: "단백질, 지방, 무기질, 물은 근육, 혈액, 뼈 등의 몸의 조직을 구성한다.",
        isCorrect: true,
        explanation: "맞습니다! 단·지·무·물 4가지 영양소가 신체 조직을 구성합니다."
      },
      {
        keyword: "생리 기능 조절",
        statement: "단백질, 비타민, 무기질, 물은 체온 유지 등 몸의 기능을 조절한다.",
        isCorrect: true,
        explanation: "맞습니다! 단·비·무·물 4가지 영양소가 생리 기능을 조절합니다."
      },
      {
        keyword: "단백질의 다재다능",
        statement: "단백질은 에너지 공급, 신체 조직 구성, 생리 기능 조절의 3대 기능을 모두 한다.",
        isCorrect: true,
        explanation: "맞습니다! 단백질은 3대 기능(에너지 공급, 조직 구성, 기능 조절) 모두에 관여하는 유일한 영양소입니다."
      },
      {
        keyword: "청소년기 영양",
        statement: "성장 급등과 성적 성숙이 일어나고 활동량이 많아 충분한 영양이 필요하다.",
        isCorrect: true,
        explanation: "맞습니다! 청소년기는 신체 성장과 평생 건강을 위해 균형 잡힌 영양이 필수적입니다."
      },
      {
        keyword: "물",
        statement: "물은 신체 조직을 구성하고 체온 조절 등 생리 기능을 조절한다.",
        isCorrect: true,
        explanation: "맞습니다! 물은 체중의 약 2/3를 차지하며 신체 조직 구성과 기능 조절을 담당합니다."
      },

      // --- 틀린 지식 (FALSE - 망치로 때려야 정답!) ---
      {
        keyword: "비타민",
        statement: "1g당 4kcal의 에너지를 펑펑 공급하는 대표적인 열량원이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민은 에너지를 전혀 내지 못하며, 생리 기능 조절만 돕습니다."
      },
      {
        keyword: "무기질",
        statement: "1g당 9kcal의 고에너지를 공급하여 힘을 나게 해준다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 무기질(칼슘, 철 등)은 에너지를 공급하지 않습니다."
      },
      {
        keyword: "물",
        statement: "몸에서 에너지를 1g당 4kcal씩 공급하여 피로를 풀어준다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 물은 에너지를 내지 않는 영양소입니다."
      },
      {
        keyword: "에너지 공급",
        statement: "비타민과 무기질이 우리 몸의 주요 에너지원이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 에너지를 내는 것은 탄수화물, 단백질, 지방(탄·단·지)뿐입니다."
      },
      {
        keyword: "신체 조직 구성",
        statement: "비타민은 근육과 뼈를 직접 만드는 핵심 주재료이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민은 신체 조직을 구성하지 않고 생리 기능만 조절합니다."
      },
      {
        keyword: "청소년기 식습관",
        statement: "청소년기에 불규칙하게 먹어도 성인이 되면 저절로 건강해지므로 신경 안 써도 된다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 청소년기에 형성된 식습관은 평생의 건강에 직접적인 영향을 줍니다."
      },
      {
        keyword: "식이섬유",
        statement: "몸속에서 소화·흡수되어 많은 에너지를 내는 훌륭한 연료이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 식이섬유는 소화·흡수되지 않아 에너지를 전혀 내지 않습니다."
      },
      {
        keyword: "생리 기능 조절",
        statement: "탄수화물만이 우리 몸의 체온과 신진대사를 조절하는 유일한 영양소이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 생리 기능 조절 영양소는 단백질, 비타민, 무기질, 물입니다."
      }
    ]
  },

  // STAGE 2: 3대 영양소 (탄수화물, 단백질, 지방) 진실게임
  stage2: {
    title: "Stage 2. 3대 영양소 (탄·단·지) 진실게임",
    desc: "탄수화물, 단백질, 지방의 열량(kcal), 소화 분해 산물, 기능, 급원 식품을 감별하세요!",
    targetMolesCount: 9,
    questions: [
      // --- 올바른 지식 (TRUE - 때리면 안 됨!) ---
      {
        keyword: "탄수화물",
        statement: "1g당 4kcal를 내며, 몸속에서 포도당으로 분해되어 흡수된다.",
        isCorrect: true,
        explanation: "맞습니다! 탄수화물은 1g당 4kcal이며 최종적으로 포도당으로 분해됩니다."
      },
      {
        keyword: "뇌와 신경 세포",
        statement: "뇌와 신경 세포는 오직 포도당만을 에너지원으로 사용한다.",
        isCorrect: true,
        explanation: "맞습니다! 뇌세포의 유일한 에너지원은 포도당입니다."
      },
      {
        keyword: "식이섬유",
        statement: "에너지는 내지 않지만 장운동을 도와 변비를 예방하고 포만감을 준다.",
        isCorrect: true,
        explanation: "맞습니다! 식이섬유는 채소·과일·해조류에 많으며 배변을 돕고 비만을 방지합니다."
      },
      {
        keyword: "단백질",
        statement: "1g당 4kcal를 내며, 몸속에서 아미노산으로 분해되어 흡수된다.",
        isCorrect: true,
        explanation: "맞습니다! 단백질은 아미노산으로 분해되어 근육·내장·혈액을 구성합니다."
      },
      {
        keyword: "필수 아미노산",
        statement: "체내에서 거의 생성되지 않아 반드시 식품(동물성 등)으로 섭취해야 한다.",
        isCorrect: true,
        explanation: "맞습니다! 몸에서 못 만드는 필수 아미노산은 음식으로 반드시 보충해야 합니다."
      },
      {
        keyword: "지방",
        statement: "1g당 9kcal의 고에너지를 내며, 지방산과 글리세롤로 분해된다.",
        isCorrect: true,
        explanation: "맞습니다! 지방은 영양소 중 가장 높은 1g당 9kcal의 에너지를 냅니다."
      },
      {
        keyword: "지방의 역할",
        statement: "체온을 유지하고 외부 충격으로부터 내부 장기를 안전하게 보호한다.",
        isCorrect: true,
        explanation: "맞습니다! 피하지방은 체온 유지와 완충 작용(장기 보호)을 합니다."
      },
      {
        keyword: "불포화 지방산",
        statement: "참기름, 들기름, 올리브유, 견과류, 등 푸른 생선에 많이 함유되어 있다.",
        isCorrect: true,
        explanation: "맞습니다! 식물성 기름과 등 푸른 생선에는 건강한 불포화 지방산이 풍부합니다."
      },
      {
        keyword: "포화 지방산",
        statement: "버터, 돼지비계 등에 많으며 과다 섭취 시 심혈관 질환을 유발할 수 있다.",
        isCorrect: true,
        explanation: "맞습니다! 포화 지방산은 체내에 잘 저장되어 혈관 질환의 원인이 될 수 있습니다."
      },

      // --- 틀린 지식 (FALSE - 망치로 때려야 정답!) ---
      {
        keyword: "탄수화물",
        statement: "1g당 9kcal의 에너지를 내며 아미노산으로 분해된다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 탄수화물은 1g당 4kcal이며 '포도당'으로 분해됩니다."
      },
      {
        keyword: "뇌와 신경 세포",
        statement: "지방산과 콜레스테롤만을 유일한 에너지원으로 사용한다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 뇌와 신경 세포는 오직 '포도당'만을 에너지원으로 씁니다."
      },
      {
        keyword: "단백질",
        statement: "몸속에서 소화되면 글리세롤과 포도당으로 분해되어 흡수된다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 단백질은 '아미노산'으로 분해됩니다."
      },
      {
        keyword: "필수 아미노산",
        statement: "우리 몸속에서 얼마든지 스스로 합성되므로 음식으로 먹을 필요가 없다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 필수 아미노산은 몸에서 못 만들어 '반드시 음식으로 섭취'해야 합니다."
      },
      {
        keyword: "지방",
        statement: "1g당 4kcal의 에너지를 내며, 물에 완전히 녹아 흡수된다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 지방은 1g당 9kcal의 고효율 에너지를 냅니다."
      },
      {
        keyword: "식이섬유",
        statement: "칼로리가 매우 높아 많이 먹으면 무조건 비만이 된다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 식이섬유는 소화되지 않아 에너지가 0이며, 포만감으로 비만을 막아줍니다."
      },
      {
        keyword: "불포화 지방산",
        statement: "돼지비계, 쇠기름, 버터에 주로 많이 들어있는 기름이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 돼지비계, 버터 등은 '포화 지방산'입니다. 불포화는 참기름·생선 등입니다."
      },
      {
        keyword: "식물성 단백질",
        statement: "쇠고기, 돼지고기, 닭고기, 생선이 대표적인 식물성 단백질이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 고기와 생선은 '동물성 단백질'이며, 콩·두부가 식물성 단백질입니다."
      },
      {
        keyword: "남은 포도당",
        statement: "몸에서 쓰고 남은 포도당은 모두 소변으로 즉시 배설되어 살이 찌지 않는다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 사용하고 남은 포도당은 '체지방' 형태로 저장되어 비만의 원인이 됩니다."
      }
    ]
  },

  // STAGE 3: 미세 영양소 & 물 클리닉 (비타민, 무기질, 물)
  stage3: {
    title: "Stage 3. 미세 영양소 & 물 수사대",
    desc: "비타민(A, D, B1, B2, C)과 무기질(칼슘, 철, 나트륨), 물의 기능과 결핍증을 파헤치세요!",
    targetMolesCount: 10,
    questions: [
      // --- 올바른 지식 (TRUE - 때리면 안 됨!) ---
      {
        keyword: "지용성 비타민",
        statement: "기름에 녹고 체내에 저장되며, 결핍증이 서서히 나타난다 (A, D 등).",
        isCorrect: true,
        explanation: "맞습니다! 지용성 비타민은 지방과 함께 흡수되고 몸에 저장됩니다."
      },
      {
        keyword: "수용성 비타민",
        statement: "물에 녹고 소변으로 쉽게 배설되며, 결핍증이 빠르게 나타난다 (B군, C).",
        isCorrect: true,
        explanation: "맞습니다! 수용성 비타민은 저장되지 않아 매일 꾸준히 섭취해야 합니다."
      },
      {
        keyword: "비타민 A",
        statement: "어두운 곳에서 시력을 조절하며, 결핍 시 야맹증·안구 건조증이 생긴다.",
        isCorrect: true,
        explanation: "맞습니다! 비타민 A는 시력 보호에 필수적이며 당근, 간 등에 많습니다."
      },
      {
        keyword: "비타민 D",
        statement: "칼슘 흡수를 도와 뼈를 튼튼하게 하며, 햇빛을 받으면 체내에서 합성된다.",
        isCorrect: true,
        explanation: "맞습니다! 비타민 D는 칼슘 흡수 촉진과 뼈 건강에 중요하며 햇빛으로 합성됩니다."
      },
      {
        keyword: "비타민 B1 (티아민)",
        statement: "에너지 대사를 도우며, 부족하면 다리가 붓고 저리는 각기병이 나타난다.",
        isCorrect: true,
        explanation: "맞습니다! 비타민 B1은 에너지 대사를 도우며 돼지고기, 현미에 많습니다."
      },
      {
        keyword: "비타민 B2 (리보플라빈)",
        statement: "에너지 대사를 도우며, 부족하면 입 주변에 설염·구순구각염이 생긴다.",
        isCorrect: true,
        explanation: "맞습니다! 비타민 B2 결핍 시 입술과 혀에 염증이 생깁니다."
      },
      {
        keyword: "비타민 C (아스코르브산)",
        statement: "상처 회복과 철 흡수를 도우며, 결핍 시 잇몸 출혈 등 괴혈병이 생긴다.",
        isCorrect: true,
        explanation: "맞습니다! 신선한 채소와 과일에 풍부하며 결핍 시 괴혈병을 유발합니다."
      },
      {
        keyword: "칼슘 (Ca)",
        statement: "뼈와 치아를 구성하며, 부족하면 골다공증, 골연화증, 성장 부진이 온다.",
        isCorrect: true,
        explanation: "맞습니다! 우유, 멸치 등에 풍부하며 뼈와 치아의 주성분입니다."
      },
      {
        keyword: "철 (Fe)",
        statement: "혈액 내 헤모글로빈 성분으로 온몸에 산소를 운반하며 결핍 시 빈혈이 온다.",
        isCorrect: true,
        explanation: "맞습니다! 쇠고기, 간, 달걀노른자에 많으며 산소 운반과 빈혈 예방을 합니다."
      },
      {
        keyword: "나트륨 (Na)",
        statement: "체내 삼투압을 조절하지만, 과잉 섭취 시 고혈압과 부종을 유발한다.",
        isCorrect: true,
        explanation: "맞습니다! 소금, 라면 등에 많으며 과다 섭취 시 만성 질환의 원인이 됩니다."
      },
      {
        keyword: "물",
        statement: "체중의 약 2/3를 차지하며, 20% 이상 손실되면 생명 유지에 치명적이다.",
        isCorrect: true,
        explanation: "맞습니다! 물은 체온 조절과 노폐물 배출에 필수적이며 음료수보다 물로 마시는 게 좋습니다."
      },

      // --- 틀린 지식 (FALSE - 망치로 때려야 정답!) ---
      {
        keyword: "비타민 A",
        statement: "부족하면 뼈가 약해지고 휘어지는 구루병에 걸린다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민 A 결핍증은 '야맹증, 안구건조증'입니다. 구루병은 비타민 D 결핍증!"
      },
      {
        keyword: "비타민 D",
        statement: "햇빛을 아무리 쬐어도 사람 몸에서 절대 합성되지 않는다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민 D는 햇빛을 받으면 피부에서 스스로 합성됩니다."
      },
      {
        keyword: "비타민 C",
        statement: "부족하면 신경 염증과 다리 마비가 오는 각기병에 걸린다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민 C 결핍증은 '괴혈병(상처 회복 지연, 잇몸 출혈)'입니다. 각기병은 B1 결핍증!"
      },
      {
        keyword: "비타민 B1",
        statement: "부족하면 잇몸에서 피가 철철 나는 괴혈병이 발생한다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민 B1 결핍증은 '각기병'입니다. 괴혈병은 비타민 C 결핍증!"
      },
      {
        keyword: "비타민 B2",
        statement: "결핍되면 어두운 곳에서 사물이 안 보이는 야맹증에 걸린다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 비타민 B2 결핍증은 '설염, 구순구각염'입니다. 야맹증은 비타민 A 결핍증!"
      },
      {
        keyword: "칼슘 (Ca)",
        statement: "혈액 속 헤모글로빈을 만들어 온몸에 산소를 운반하는 핵심 미네랄이다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 산소를 운반하는 헤모글로빈 성분은 '철(Fe)'입니다. 칼슘은 뼈와 치아 구성!"
      },
      {
        keyword: "철 (Fe)",
        statement: "치아와 뼈를 딱딱하게 만들어주는 주재료로, 부족하면 골다공증이 생긴다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 뼈와 치아를 구성하는 것은 '칼슘(Ca)'입니다. 철은 헤모글로빈/산소 운반!"
      },
      {
        keyword: "나트륨 (Na)",
        statement: "라면과 짠 음식을 매일 잔뜩 먹을수록 혈압이 낮아지고 건강해진다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 나트륨 과잉 섭취는 고혈압, 부종 등 만성 질환을 일으킵니다."
      },
      {
        keyword: "물",
        statement: "목이 마를 땐 맹물보다 당분이 든 탄산음료로만 수분을 채우는 게 훨씬 좋다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 음료보다는 깨끗한 순수 물의 형태로 섭취하는 것이 좋습니다."
      },
      {
        keyword: "수용성 비타민",
        statement: "기름에만 녹으며 몸 밖으로 배설되지 않고 간에 평생 쌓인다!",
        isCorrect: false,
        explanation: "🚨 틀렸습니다! 수용성 비타민은 '물에 녹으며 소변으로 배설'됩니다. 기름에 녹는 건 지용성!"
      }
    ]
  },

  // STAGE 4: 전 단원 마스터 종합 챌린지 (고난도 & 스피드)
  stage4: {
    title: "Stage 4. 종합 챌린지: 영양 마스터",
    desc: "교과서 56~59쪽 전체 범위에서 출제됩니다! 올바른 두더지는 보호하고 오답 두더지만 골라내세요!",
    targetMolesCount: 12,
    questions: [] // game.js 초기화 시 stage1, 2, 3의 문항들을 섞어서 자동 구성
  }
};
