/* ==========================================================================
   청소년기 영양 틀린 두더지 잡기 게임 메인 로직
   - 규칙: 올바른 설명(True)은 살려두고, 틀린 설명(False)만 때려잡는다!
   - 핵심 설정: 등장속도는 초고속(0.18s CSS), 머무르는 시간은 길게(기본 4.5초)
   ========================================================================== */

class WhackAMoleGame {
  constructor() {
    this.currentStageKey = 'stage1';
    this.score = 0;
    this.lives = 3;
    this.combo = 0;
    this.timeRemaining = 60; // 초
    this.gameTimer = null;
    this.spawnTimer = null;
    this.isPlaying = false;

    // 사용자 맞춤 설정 (기본 머무르는 시간: 15000ms = 15초)
    this.settings = {
      stayDuration: 15000, // 머무르는 시간 (기본 15초)
      spawnInterval: 2500, // 다음 두더지 출현 간격 (ms)
      initialTime: 120,    // 스테이지 제한 시간 (초, 넉넉하게 120초)
    };

    // 통계 및 오답 노트
    this.stats = {
      caughtCount: 0,
      missedCount: 0,
      wrongHitsCount: 0,
    };
    this.reviewNotes = []; // 오답 노트 항목 저장 배열

    // 9개 구멍 상태 관리
    this.holes = [];
    this.activeMoles = new Map(); // holeIndex -> { timeoutId, warningTimeoutId, data }

    // DOM 캐싱
    this.cacheDom();
    this.bindEvents();
    this.initStage4Questions();
  }

  // 4단계 종합 챌린지 문항 자동 병합
  initStage4Questions() {
    const s1 = QUIZ_DATA.stage1.questions;
    const s2 = QUIZ_DATA.stage2.questions;
    const s3 = QUIZ_DATA.stage3.questions;
    QUIZ_DATA.stage4.questions = [...s1, ...s2, ...s3];
  }

  cacheDom() {
    this.dom = {
      arena: document.getElementById('gameArena'),
      scoreText: document.getElementById('scoreText'),
      timerText: document.getElementById('timerText'),
      timerBox: document.getElementById('timerBox'),
      comboText: document.getElementById('comboText'),
      stageBadge: document.getElementById('stageBadge'),
      hearts: document.querySelectorAll('.heart'),
      ruleBanner: document.getElementById('ruleBanner'),
      
      // 모달 엘리먼트들
      startModal: document.getElementById('startModal'),
      resultModal: document.getElementById('resultModal'),
      summaryModal: document.getElementById('summaryModal'),
      settingsModal: document.getElementById('settingsModal'),
      
      // 모달 내용
      resultTitle: document.getElementById('resultTitle'),
      resultScore: document.getElementById('resultScore'),
      resultSummary: document.getElementById('resultSummary'),
      wrongNoteList: document.getElementById('wrongNoteList'),
      nextStageBtn: document.getElementById('nextStageBtn'),

      // 버튼들
      startGameBtn: document.getElementById('startGameBtn'),
      openSummaryBtn: document.getElementById('openSummaryBtn'),
      openSettingsBtn: document.getElementById('openSettingsBtn'),
      soundToggleBtn: document.getElementById('soundToggleBtn'),
      stageSelectCards: document.querySelectorAll('.stage-card'),
      durationToggles: document.querySelectorAll('.duration-toggle'),
    };

    // 9개 구멍 엘리먼트 수집
    for (let i = 0; i < 9; i++) {
      this.holes.push({
        element: document.getElementById(`hole-${i}`),
        moleContainer: document.getElementById(`mole-${i}`),
        keywordEl: document.getElementById(`kw-${i}`),
        textEl: document.getElementById(`txt-${i}`),
        isOccupied: false
      });
    }
  }

  bindEvents() {
    // 오디오 컨텍스트 첫 클릭 초기화
    document.addEventListener('pointerdown', () => {
      audioManager.init();
    }, { once: true });

    // 소리 켜기/끄기 토글
    if (this.dom.soundToggleBtn) {
      this.dom.soundToggleBtn.addEventListener('click', () => {
        const enabled = audioManager.toggleSound();
        this.dom.soundToggleBtn.innerHTML = enabled 
          ? `<span>🔊</span> 소리 켜짐` 
          : `<span>🔇</span> 소리 꺼짐`;
      });
    }

    // 모달 열기/닫기
    this.dom.openSummaryBtn.addEventListener('click', () => this.openModal(this.dom.summaryModal));
    this.dom.openSettingsBtn.addEventListener('click', () => this.openModal(this.dom.settingsModal));

    document.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) this.closeModal(modal);
      });
    });

    // 스테이지 선택 카드 클릭
    this.dom.stageSelectCards.forEach(card => {
      card.addEventListener('click', () => {
        this.dom.stageSelectCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.currentStageKey = card.dataset.stage;
      });
    });

    // 설정: 머무르는 시간(대기 시간) 조절
    this.dom.durationToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.durationToggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.settings.stayDuration = parseInt(btn.dataset.duration, 10);
      });
    });

    // 게임 시작 버튼
    this.dom.startGameBtn.addEventListener('click', () => {
      this.closeModal(this.dom.startModal);
      this.startStage(this.currentStageKey);
    });

    // 다음 스테이지 / 다시하기 버튼
    this.dom.nextStageBtn.addEventListener('click', () => {
      this.closeModal(this.dom.resultModal);
      if (this.nextStageTarget) {
        this.startStage(this.nextStageTarget);
      } else {
        this.openModal(this.dom.startModal);
      }
    });

    // 9개 구멍에 대한 타격 이벤트 바인딩 (이벤트 위임)
    this.holes.forEach((hole, index) => {
      hole.moleContainer.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.handleMoleWhack(index);
      });
    });
  }

  openModal(modal) {
    if (modal) modal.classList.add('active');
  }

  closeModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  // --- 게임 시작 및 스테이지 초기화 ---
  startStage(stageKey) {
    this.currentStageKey = stageKey;
    const stageInfo = QUIZ_DATA[stageKey];
    this.dom.stageBadge.textContent = stageInfo.title.split('.')[1]?.trim() || stageInfo.title;

    // 게임 변수 리셋
    this.isPlaying = true;
    this.lives = 3;
    this.combo = 0;
    this.timeRemaining = this.settings.initialTime;
    this.stats = { caughtCount: 0, missedCount: 0, wrongHitsCount: 0 };
    this.reviewNotes = [];

    this.updateHUD();
    this.clearAllHoles();

    // 타이머 가동
    clearInterval(this.gameTimer);
    clearInterval(this.spawnTimer);

    this.gameTimer = setInterval(() => this.tick(), 1000);
    this.spawnTimer = setInterval(() => this.spawnMole(), this.settings.spawnInterval);

    // 첫 두더지 즉시 등장!
    setTimeout(() => this.spawnMole(), 300);
  }

  // 초당 타이머 틱
  tick() {
    if (!this.isPlaying) return;

    this.timeRemaining--;
    this.updateHUD();

    if (this.timeRemaining <= 10) {
      this.dom.timerBox.classList.add('warning');
    } else {
      this.dom.timerBox.classList.remove('warning');
    }

    if (this.timeRemaining <= 0) {
      this.endGame(true); // 시간 완료로 스테이지 종료 판정
    }
  }

  // --- 두더지 등장(Spawn) 로직 ---
  spawnMole() {
    if (!this.isPlaying) return;

    // 비어 있는 구멍 찾기
    const availableHoles = this.holes
      .map((hole, index) => ({ hole, index }))
      .filter(item => !item.hole.isOccupied);

    if (availableHoles.length === 0) return;

    // 랜덤 구멍 선택
    const randomItem = availableHoles[Math.floor(Math.random() * availableHoles.length)];
    const holeIndex = randomItem.index;
    const holeObj = randomItem.hole;

    // 현재 스테이지 문항에서 무작위 선택
    const stageQuestions = QUIZ_DATA[this.currentStageKey].questions;
    const question = stageQuestions[Math.floor(Math.random() * stageQuestions.length)];

    // 구멍에 문제 데이터 주입
    holeObj.keywordEl.textContent = question.keyword;
    holeObj.textEl.textContent = question.statement;
    holeObj.isOccupied = true;

    // 시각적 클래스 적용: 즉각 솟아오름 (0.18s 애니메이션)
    holeObj.moleContainer.classList.remove('retreating', 'hit-good', 'hit-bad', 'time-warning');
    holeObj.moleContainer.classList.add('up');
    audioManager.playMolePop();

    // 머무르는 시간(Stay Duration) 타이머 설정
    // 1) 종료 2.5초 전 깜빡임 경고 (시각 힌트)
    const warningTime = Math.max(this.settings.stayDuration - 2500, 1000);
    const warningTimeoutId = setTimeout(() => {
      if (holeObj.isOccupied && holeObj.moleContainer.classList.contains('up')) {
        holeObj.moleContainer.classList.add('time-warning');
      }
    }, warningTime);

    // 2) 머무르는 시간 만료 후 스스로 숨음
    const timeoutId = setTimeout(() => {
      this.handleMoleEscape(holeIndex);
    }, this.settings.stayDuration);

    this.activeMoles.set(holeIndex, {
      timeoutId,
      warningTimeoutId,
      question
    });
  }

  // 두더지를 제때 못 잡고 도망갔을 때
  handleMoleEscape(holeIndex) {
    const moleData = this.activeMoles.get(holeIndex);
    if (!moleData) return;

    const holeObj = this.holes[holeIndex];

    // 만약 도망간 두더지가 '틀린 설명(오답)'이었는데 놓쳤다면 오답 노트에 기록
    if (!moleData.question.isCorrect) {
      this.stats.missedCount++;
      this.reviewNotes.push({
        type: 'missed',
        keyword: moleData.question.keyword,
        statement: moleData.question.statement,
        explanation: moleData.question.explanation
      });
    }

    this.retreatMole(holeIndex);
  }

  // 두더지 굴 속으로 숨기기
  retreatMole(holeIndex) {
    const holeObj = this.holes[holeIndex];
    const moleData = this.activeMoles.get(holeIndex);

    if (moleData) {
      clearTimeout(moleData.timeoutId);
      clearTimeout(moleData.warningTimeoutId);
      this.activeMoles.delete(holeIndex);
    }

    holeObj.moleContainer.classList.remove('up', 'time-warning');
    holeObj.moleContainer.classList.add('retreating');

    setTimeout(() => {
      holeObj.isOccupied = false;
      holeObj.moleContainer.classList.remove('retreating', 'hit-good', 'hit-bad');
    }, 240);
  }

  // --- 플레이어의 타격(Whack) 판정 ---
  handleMoleWhack(holeIndex) {
    if (!this.isPlaying) return;

    const moleData = this.activeMoles.get(holeIndex);
    if (!moleData) return;

    const holeObj = this.holes[holeIndex];
    const question = moleData.question;

    // 타이머 즉시 해제
    clearTimeout(moleData.timeoutId);
    clearTimeout(moleData.warningTimeoutId);
    this.activeMoles.delete(holeIndex);

    // [판정 1] 틀린 두더지를 잡았을 때 (정답 플레이!)
    if (question.isCorrect === false) {
      this.combo++;
      const comboBonus = (this.combo > 1) ? (this.combo * 20) : 0;
      const earned = 100 + comboBonus;
      this.score += earned;
      this.stats.caughtCount++;

      audioManager.playHammerHit();
      if (this.combo >= 3) {
        audioManager.playCombo(this.combo);
      }

      holeObj.moleContainer.classList.remove('up');
      holeObj.moleContainer.classList.add('hit-good');

      this.showFloatingText(holeObj.element, `+${earned}!`, 'success');

      setTimeout(() => {
        holeObj.isOccupied = false;
        holeObj.moleContainer.classList.remove('hit-good');
      }, 400);

      // 목표 마릿수 달성 체크
      const targetCount = QUIZ_DATA[this.currentStageKey].targetMolesCount;
      if (this.stats.caughtCount >= targetCount) {
        this.endGame(true);
        return;
      }
    } 
    // [판정 2] 옳은 두더지를 잘못 때렸을 때 (오판!)
    else {
      this.combo = 0;
      this.score = Math.max(0, this.score - 50);
      this.lives--;
      this.stats.wrongHitsCount++;

      audioManager.playWrongHit();

      // 오답 노트에 '무고한 두더지 타격'으로 기록
      this.reviewNotes.push({
        type: 'innocent',
        keyword: question.keyword,
        statement: question.statement,
        explanation: question.explanation
      });

      holeObj.moleContainer.classList.remove('up');
      holeObj.moleContainer.classList.add('hit-bad');

      this.showFloatingText(holeObj.element, `아야! -50`, 'penalty');

      setTimeout(() => {
        holeObj.isOccupied = false;
        holeObj.moleContainer.classList.remove('hit-bad');
      }, 400);

      if (this.lives <= 0) {
        this.endGame(false); // 라이프 소진으로 게임 오버
        return;
      }
    }

    this.updateHUD();
  }

  // 타격 시 플로팅 텍스트 이펙트 생성
  showFloatingText(container, text, type) {
    const el = document.createElement('div');
    el.className = `hit-effect ${type}`;
    el.textContent = text;
    container.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 750);
  }

  // HUD (점수, 라이프, 콤보, 시간) 갱신
  updateHUD() {
    this.dom.scoreText.textContent = this.score;
    this.dom.timerText.textContent = `${this.timeRemaining}s`;
    this.dom.comboText.textContent = `${this.combo} C`;

    // 하트 라이프 표시
    this.dom.hearts.forEach((heart, idx) => {
      if (idx < this.lives) {
        heart.classList.remove('lost');
      } else {
        heart.classList.add('lost');
      }
    });
  }

  // 9개 구멍 모두 정리
  clearAllHoles() {
    this.activeMoles.forEach((moleData) => {
      clearTimeout(moleData.timeoutId);
      clearTimeout(moleData.warningTimeoutId);
    });
    this.activeMoles.clear();

    this.holes.forEach(hole => {
      hole.isOccupied = false;
      hole.moleContainer.classList.remove('up', 'retreating', 'hit-good', 'hit-bad', 'time-warning');
    });
  }

  // --- 게임 종료 / 스테이지 클리어 처리 ---
  endGame(isClear) {
    this.isPlaying = false;
    clearInterval(this.gameTimer);
    clearInterval(this.spawnTimer);
    this.clearAllHoles();

    if (isClear) {
      audioManager.playStageClear();
      this.dom.resultTitle.textContent = "🎉 스테이지 클리어!";
      this.dom.resultTitle.style.color = "#2e7d32";
    } else {
      audioManager.playGameOver();
      this.dom.resultTitle.textContent = "💥 하트 소진 (Game Over)";
      this.dom.resultTitle.style.color = "#d32f2f";
    }

    this.dom.resultScore.textContent = `${this.score} 점`;

    // 통계 요약
    this.dom.resultSummary.innerHTML = `
      <span>잡은 틀린 두더지: <strong>${this.stats.caughtCount}마리</strong></span> |
      <span>놓친 틀린 두더지: <strong>${this.stats.missedCount}마리</strong></span> |
      <span>잘못 때린 두더지: <strong>${this.stats.wrongHitsCount}마리</strong></span>
    `;

    // 다음 스테이지 안내 설정
    this.setupNextStageButton(isClear);

    // 오답 노트 렌더링
    this.renderReviewNotes();

    this.openModal(this.dom.resultModal);
  }

  setupNextStageButton(isClear) {
    const stageFlow = {
      stage1: 'stage2',
      stage2: 'stage3',
      stage3: 'stage4',
      stage4: null
    };

    if (isClear && stageFlow[this.currentStageKey]) {
      this.nextStageTarget = stageFlow[this.currentStageKey];
      const nextTitle = QUIZ_DATA[this.nextStageTarget].title.split('.')[0];
      this.dom.nextStageBtn.textContent = `▶ 다음 단계 (${nextTitle}) 도전`;
    } else {
      this.nextStageTarget = null;
      this.dom.nextStageBtn.textContent = "🔄 메인 화면으로 돌아가기";
    }
  }

  // 오답 노트 렌더링
  renderReviewNotes() {
    this.dom.wrongNoteList.innerHTML = '';

    if (this.reviewNotes.length === 0) {
      this.dom.wrongNoteList.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #2e7d32; font-weight: 800;">
          ✨ 완벽합니다! 놓치거나 잘못 판정한 두더지가 한 마리도 없습니다!
        </div>
      `;
      return;
    }

    this.reviewNotes.forEach((item, index) => {
      const noteEl = document.createElement('div');
      noteEl.className = `wrong-note-item ${item.type === 'innocent' ? 'was-innocent' : ''}`;

      const tagText = item.type === 'innocent' 
        ? '⚠️ [오판] 맞는 말인데 때렸어요!' 
        : '👀 [놓침] 틀린 말인데 그냥 보냈어요!';

      noteEl.innerHTML = `
        <div class="wrong-note-header">
          <span style="color: ${item.type === 'innocent' ? '#c62828' : '#e65100'}; font-weight: 900;">
            ${tagText}
          </span>
          <span style="background: #e0e0e0; padding: 2px 8px; border-radius: 6px;">[${item.keyword}]</span>
        </div>
        <div class="wrong-note-statement">"${item.statement}"</div>
        <div class="wrong-note-feedback">${item.explanation}</div>
      `;

      this.dom.wrongNoteList.appendChild(noteEl);
    });
  }
}

// 게임 인스턴스 초기화
let game;
window.addEventListener('DOMContentLoaded', () => {
  game = new WhackAMoleGame();
});
