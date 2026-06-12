import React, { useState, useEffect } from 'react';

// Bilingual component library - transformed and deduplicated from public PromptDexter patterns
// All content is original recombination logic, not direct copies
const componentLibrary = {
  subjects: [
    { en: "adult woman in her late twenties", zh: "二十多岁的成年女性" },
    { en: "adult man in his thirties", zh: "三十多岁的成年男性" },
    { en: "young couple in their mid-twenties", zh: "二十五岁左右的年轻情侣" },
    { en: "solo woman with long dark hair", zh: "长黑发的独身女性" },
    { en: "mature couple in casual homewear", zh: "穿着休闲家居服的成熟情侣" }
  ],
  actionsAndReactions: [
    { en: "pointing at the unexpected discovery in wide-eyed disbelief while her partner bursts into nervous laughter", zh: "难以置信地指向意外发现，同时伴侣紧张地大笑" },
    { en: "awkwardly trying to cover herself after a sudden wardrobe malfunction, cheeks flushed with a mix of embarrassment and reluctant amusement", zh: "突然走光后尴尬地试图遮挡自己，脸颊泛红，带着尴尬与不情愿的笑意" },
    { en: "leaning forward with an exaggerated OK hand gesture while the other stares in shock at the off-frame event", zh: "身体前倾做出夸张的OK手势，另一人震惊地盯着画外事件" },
    { en: "sharing a private joke that only they understand, leading to uncontrollable giggles and a failed attempt to stay composed", zh: "分享只有他们懂的私人笑话，导致无法控制的咯咯笑和保持镇定的失败尝试" },
    { en: "reacting to discovering an intimate photo on a phone screen with a dramatic overreaction and quick attempt to hide the screen", zh: "对手机屏幕上发现的亲密照片做出戏剧性过度反应，并迅速试图隐藏屏幕" },
    { en: "in the middle of an intimate moment when an off-frame sound causes both to freeze in awkward, explicit surprise", zh: "亲密时刻中，画外声音导致两人僵住，带着尴尬而明确的惊讶" }
  ],
  environmentsAndEvidence: [
    { en: "scattered clothes on the floor, an open window with billowing curtains, and a half-finished glass of wine on the nightstand suggesting a private evening that took an unexpected turn", zh: "地板上散落的衣物、窗帘飘动的敞开窗户，以及床头柜上半满的酒杯，暗示私人夜晚发生了意想不到的转折" },
    { en: "children's sand toys, small flip-flops, juice boxes and colorful towels scattered around implying a family beach day, with ocean waves visible beyond suggesting the cause of the collapse", zh: "散落的儿童玩沙玩具、小号人字拖、果汁盒和彩色沙滩毛巾，暗示家庭海滩日，海浪可见暗示倒塌原因" },
    { en: "rumpled bedsheets, a phone screen still glowing with a revealing image, and a partially closed bedroom door with light spilling from the hallway", zh: "凌乱的床单、仍发光的手机屏幕显示露骨图像，以及半掩的卧室门，门外光线洒入" },
    { en: "urban alleyway with distant traffic sounds, a discarded jacket on the ground, and a half-open fire escape door revealing the private moment", zh: "城市小巷远处交通声，地上丢弃的夹克，以及半开的消防通道门揭示私人时刻" }
  ],
  lightingAndStyle: [
    { en: "warm golden hour backlight creating gentle rim glow around their bodies", zh: "温暖的金色时段背光，在他们身体周围营造轻柔的轮廓光" },
    { en: "soft natural window light with subtle shadows highlighting skin tones and expressions", zh: "柔和的自然窗光，微妙阴影突出肤色和表情" },
    { en: "low-key moody lighting with deep shadows and a single warm lamp casting intimate highlights", zh: "低调情绪化光线，深阴影和单盏暖灯投射亲密高光" },
    { en: "dramatic side lighting that catches the exact moment of reaction and flushed skin", zh: "戏剧性侧光捕捉反应的精确瞬间和泛红的皮肤" }
  ],
  observerPerspectives: [
    { en: "viewed from behind stacked rental beach chairs as an amateur observer", zh: "作为业余观察者从堆叠的租赁沙滩椅后方观看" },
    { en: "seen through a partially open bedroom door from the dark hallway", zh: "从黑暗走廊透过半开的卧室门观看" },
    { en: "peep-hole or keyhole framing creating a voyeuristic yet documentary feel", zh: "猫眼或钥匙孔构图，营造偷窥感但保持纪实风格" },
    { en: "from inside a slightly ajar closet door, capturing the private discovery", zh: "从微微敞开的衣柜门内捕捉私人发现" },
    { en: "through rain-streaked window glass with natural imperfections in framing", zh: "透过雨水斑驳的窗户玻璃，构图带有自然不完美" }
  ],
  momentTypes: [
    "in sinuated sexual activity interrupted by an off-frame sound causing visible awkward reaction",
    "candid nudity after a sudden wardrobe malfunction with explicit but natural body language",
    "voyeuristic sexual content from a hidden vantage point capturing the exact timing of discovery",
    "shared private joke escalating into awkward and explicit physical reaction",
    "off-frame surprise leading to dramatic overreaction and failed attempt to cover up",
    "sexual object or image discovered on phone causing visible consequence and flushed reaction",
    "awkward and explicit reaction to a failed attempt at privacy in a semi-public setting",
    "dramatic overreaction to a collapsed intimate setup or unexpected exposure",
    "failed instruction moment leading to public or semi-public nudity and immediate regret",
    "public nudity in a semi-private beach or room setting with timing-driven candid capture",
    "peep hole and spy camera view of an intimate moment with authentic timing",
    "timing-driven candid moment of private discovery or interrupted intimacy"
  ],
  technicalSuffix: "candid documentary photography, authentic timing-driven storytelling, telephoto lens, natural body language, imperfect framing, realistic amateur observer perspective, high-resolution photo realism."
};

// Helper to get random item from array
const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Main generation engine - recombines components into original coherent narrative
// Always answers "Why did the photographer press the shutter at this exact instant?"
function generatePrompt(
  roughIdea: string,
  selections: {
    sceneCategory: string;
    subject: string;
    momentType: string;
    reactionPair: string;
    observer: string;
    visualStyle: string;
  }
): { en: string; zh: string } {
  const { subject, momentType, reactionPair, observer, visualStyle } = selections;

  // Find matching components or fallback to random for originality
  const subjectObj = componentLibrary.subjects.find(s => s.en.toLowerCase().includes(subject.toLowerCase().split(' ')[0])) || getRandom(componentLibrary.subjects);
  const actionObj = componentLibrary.actionsAndReactions.find(a => a.en.toLowerCase().includes(reactionPair.toLowerCase().split(' ')[0])) || getRandom(componentLibrary.actionsAndReactions);
  const envObj = componentLibrary.environmentsAndEvidence.find(e => e.en.toLowerCase().includes(selections.sceneCategory.toLowerCase())) || getRandom(componentLibrary.environmentsAndEvidence);
  const lightObj = componentLibrary.lightingAndStyle.find(l => l.en.toLowerCase().includes(visualStyle.toLowerCase().split(' ')[0])) || getRandom(componentLibrary.lightingAndStyle);
  const observerObj = componentLibrary.observerPerspectives.find(o => o.en.toLowerCase().includes(observer.toLowerCase().split(' ')[0])) || getRandom(componentLibrary.observerPerspectives);

  // Core narrative: Why the shutter now? The exact timing of the reaction to the moment type
  const whyShutter = `the photographer pressed the shutter at this exact instant because ${momentType.toLowerCase()}, capturing the raw, unposed reaction before anyone could compose themselves`;

  // Build English prompt - coherent paragraph, no bullets, narrative-first
  const enParts = [
    `A candid ${observerObj.en} photograph`,
    `captures ${subjectObj.en} in the precise moment of ${actionObj.en}`,
    `in ${envObj.en}`,
    `${lightObj.en}`,
    `${whyShutter}`,
    roughIdea ? `, with the scene subtly incorporating ${roughIdea.toLowerCase()}` : '',
    `, ${componentLibrary.technicalSuffix}`
  ];

  const en = enParts.filter(Boolean).join(', ').replace(/, ,/g, ',').replace(/\s+/g, ' ').trim();

  // Parallel Chinese construction - direct, natural translation preserving structure and meaning
  const zhParts = [
    `一张${observerObj.zh}的抓拍照片`,
    `捕捉了${subjectObj.zh}在${actionObj.zh}的精确瞬间`,
    `场景中${envObj.zh}`,
    `${lightObj.zh}`,
    `摄影师按下快门的精确瞬间是因为${momentType.toLowerCase()}，捕捉了原始、未摆姿的反应`,
    roughIdea ? `，场景中微妙融入了${roughIdea}` : '',
    `，${componentLibrary.technicalSuffix.replace(/candid documentary photography/g, '纪实抓拍摄影').replace(/authentic timing-driven storytelling/g, '真实瞬间驱动的叙事感').replace(/telephoto lens/g, '长焦镜头').replace(/natural body language/g, '自然肢体语言').replace(/imperfect framing/g, '不完美构图').replace(/realistic amateur observer perspective/g, '真实业余观察者视角').replace(/high-resolution photo realism/g, '高分辨率照片级写实风格')}`
  ];

  const zh = zhParts.filter(Boolean).join('，').replace(/，，/g, '，').replace(/\s+/g, ' ').trim();

  return { en, zh };
}

interface PromptHistoryItem {
  id: number;
  timestamp: string;
  en: string;
  zh: string;
  idea: string;
}

const App: React.FC = () => {
  const [roughIdea, setRoughIdea] = useState('');
  const [sceneCategory, setSceneCategory] = useState('Private Intimate Setting');
  const [subject, setSubject] = useState('adult woman in her late twenties');
  const [momentType, setMomentType] = useState(componentLibrary.momentTypes[0]);
  const [reactionPair, setReactionPair] = useState('pointing in disbelief while partner laughs');
  const [observer, setObserver] = useState('viewed from behind stacked rental beach chairs');
  const [visualStyle, setVisualStyle] = useState('Golden Hour Documentary');

  const [generated, setGenerated] = useState<{ en: string; zh: string } | null>(null);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nsfe-prompt-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: PromptHistoryItem[]) => {
    localStorage.setItem('nsfe-prompt-history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    // Small delay for UX feel of "processing"
    setTimeout(() => {
      const selections = {
        sceneCategory,
        subject,
        momentType,
        reactionPair,
        observer,
        visualStyle
      };

      const result = generatePrompt(roughIdea, selections);
      setGenerated(result);

      // Add to history
      const newItem: PromptHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        en: result.en,
        zh: result.zh,
        idea: roughIdea || 'No additional idea'
      };

      const updatedHistory = [newItem, ...history].slice(0, 12); // Keep last 12
      saveHistory(updatedHistory);

      setIsGenerating(false);
    }, 280);
  };

  const handleRemix = () => {
    if (!generated) return;

    setIsGenerating(true);

    setTimeout(() => {
      // Randomly vary some selections for remix
      const newSelections = {
        sceneCategory,
        subject: getRandom(componentLibrary.subjects).en,
        momentType: getRandom(componentLibrary.momentTypes),
        reactionPair: getRandom(componentLibrary.actionsAndReactions).en.split(',')[0],
        observer: getRandom(componentLibrary.observerPerspectives).en,
        visualStyle: getRandom(componentLibrary.lightingAndStyle).en.split(' ')[0] + ' ' + getRandom(['Documentary', 'Natural', 'Intimate'])
      };

      const result = generatePrompt(roughIdea || 'remixed private moment', newSelections);
      setGenerated(result);

      const newItem: PromptHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString() + ' (remix)',
        en: result.en,
        zh: result.zh,
        idea: roughIdea || 'Remixed'
      };

      const updatedHistory = [newItem, ...history].slice(0, 12);
      saveHistory(updatedHistory);

      setIsGenerating(false);
    }, 220);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
        if (btn.innerText.includes('COPY')) {
          const orig = btn.innerText;
          btn.innerText = 'COPIED!';
          setTimeout(() => {
            btn.innerText = orig;
          }, 1200);
        }
      });
    });
  };

  const loadFromHistory = (item: PromptHistoryItem) => {
    setGenerated({ en: item.en, zh: item.zh });
    setRoughIdea(item.idea === 'No additional idea' || item.idea === 'Remixed' ? '' : item.idea);
  };

  const clearHistory = () => {
    localStorage.removeItem('nsfe-prompt-history');
    setHistory([]);
  };

  const clearOutput = () => {
    setGenerated(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl tracking-tighter">NS</div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tighter">NSFE Prompt Builder</h1>
                <p className="text-xs text-zinc-500 -mt-1">Narrative-First • Timing-Driven • Z-Image / Z-Turbo</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              LOCAL ONLY • ORIGINAL COMPONENTS
            </div>
            <button 
              onClick={clearHistory}
              className="text-xs px-4 py-2 hover:bg-zinc-900 rounded-xl border border-zinc-800 transition-colors"
            >
              Clear History
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Methodology Banner */}
        <div className="mb-8 p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="uppercase tracking-[3px] text-[10px] text-violet-400 mb-2 font-mono">CORE METHODOLOGY</div>
              <h2 className="text-2xl font-semibold tracking-tighter mb-3">Every prompt must answer:<br />“Why did the photographer press the shutter at this exact instant?”</h2>
              <p className="text-zinc-400 max-w-md">Prioritizes Narrative Event → Subject Reaction → Relationship Clues → Visible Evidence → Observer Perspective → Technical Photography Style. Generates original candid, timing-driven scenes by recombining modular components.</p>
            </div>
            <div className="text-xs text-zinc-500 max-w-xs border-l border-zinc-800 pl-6 pt-1">
              Avoids generic static scenes. Focuses on insinuated intimate moments, candid reactions, voyeuristic timing, awkward explicit consequences, and private discoveries. All output is original recombination — never direct copies.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-mono">1. ROUGH IDEA (OPTIONAL SEED)</div>
              <textarea
                value={roughIdea}
                onChange={(e) => setRoughIdea(e.target.value)}
                placeholder="e.g. interrupted private moment on the balcony at night, or family beach day gone awkward..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm h-24 resize-y focus:outline-none focus:border-violet-600 placeholder:text-zinc-600"
              />
            </div>

            {/* Selectors */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">2. SCENE CATEGORY</div>
                <select 
                  value={sceneCategory} 
                  onChange={(e) => setSceneCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
                >
                  <option>Private Intimate Setting</option>
                  <option>Beach / Outdoor Semi-Private</option>
                  <option>Urban Alley or Balcony</option>
                  <option>Domestic Bedroom / Living Room</option>
                  <option>Semi-Public or Voyeuristic View</option>
                </select>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">3. SUBJECT / CONTEXT</div>
                <select 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
                >
                  {componentLibrary.subjects.map(s => (
                    <option key={s.en} value={s.en}>{s.en}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">4. MOMENT TYPE (DRIVES THE REACTION)</div>
                <select 
                  value={momentType} 
                  onChange={(e) => setMomentType(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 h-auto"
                >
                  {componentLibrary.momentTypes.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
                <div className="text-[10px] text-zinc-500 mt-1.5 px-1">These drive the core "why shutter now" narrative</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">5. REACTION PAIR</div>
                <select 
                  value={reactionPair} 
                  onChange={(e) => setReactionPair(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
                >
                  {componentLibrary.actionsAndReactions.map((a, i) => (
                    <option key={i} value={a.en.split(',')[0]}>{a.en.split(',')[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">6. OBSERVER PERSPECTIVE</div>
                <select 
                  value={observer} 
                  onChange={(e) => setObserver(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
                >
                  {componentLibrary.observerPerspectives.map((o, i) => (
                    <option key={i} value={o.en}>{o.en}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-mono">7. VISUAL / LIGHTING STYLE</div>
                <select 
                  value={visualStyle} 
                  onChange={(e) => setVisualStyle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
                >
                  {componentLibrary.lightingAndStyle.map((l, i) => (
                    <option key={i} value={l.en.split(' ')[0]}>{l.en.split(' ').slice(0,3).join(' ')}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-all text-white font-semibold py-4 rounded-2xl text-sm tracking-wider disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isGenerating ? 'GENERATING...' : 'GENERATE PROMPT'}
              </button>
              <button
                onClick={handleRemix}
                disabled={!generated || isGenerating}
                className="px-8 border border-zinc-700 hover:bg-zinc-900 active:bg-zinc-800 transition-all rounded-2xl text-sm font-medium disabled:opacity-40"
              >
                REMIX
              </button>
              <button
                onClick={clearOutput}
                className="px-5 border border-zinc-800 hover:bg-zinc-900 rounded-2xl text-sm"
              >
                CLEAR
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-7 space-y-6">
            {!generated ? (
              <div className="h-full min-h-[420px] bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center p-12 text-center">
                <div>
                  <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-4xl">📸</span>
                  </div>
                  <div className="text-xl font-semibold tracking-tight mb-2">Ready to generate</div>
                  <p className="text-zinc-500 max-w-xs mx-auto">Fill the inputs above and click Generate. The engine will recombine modular components into a fresh, timing-driven narrative prompt.</p>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
                {/* English Version */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="uppercase text-xs tracking-[2px] text-emerald-400 font-mono">ENGLISH VERSION</div>
                    <button 
                      onClick={(e) => handleCopy(generated.en, 'English')}
                      className="text-xs px-5 py-1.5 rounded-full border border-emerald-900 hover:bg-emerald-950 text-emerald-400 transition-colors active:scale-[0.985]"
                    >
                      COPY ENGLISH
                    </button>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-[15px] leading-relaxed font-light tracking-[-0.1px]">
                    {generated.en}
                  </div>
                </div>

                {/* Chinese Version */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="uppercase text-xs tracking-[2px] text-sky-400 font-mono">SIMPLIFIED CHINESE VERSION</div>
                    <button 
                      onClick={(e) => handleCopy(generated.zh, 'Chinese')}
                      className="text-xs px-5 py-1.5 rounded-full border border-sky-900 hover:bg-sky-950 text-sky-400 transition-colors active:scale-[0.985]"
                    >
                      COPY CHINESE
                    </button>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-[15px] leading-relaxed font-light tracking-[-0.1px]">
                    {generated.zh}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                  <button onClick={handleRemix} className="text-xs flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <span>REMIX THIS PROMPT</span> 
                    <span className="text-lg leading-none">↻</span>
                  </button>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="uppercase text-xs tracking-widest text-zinc-500 font-mono">RECENT PROMPTS (LOCALSTORAGE)</div>
                  <div className="text-[10px] text-zinc-600">{history.length} saved</div>
                </div>
                <div className="space-y-2 max-h-[280px] overflow-auto pr-2 custom-scroll">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => loadFromHistory(item)}
                      className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 cursor-pointer transition-all active:bg-zinc-900 text-sm"
                    >
                      <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                        <div>{item.timestamp}</div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400 text-[10px]">LOAD →</div>
                      </div>
                      <div className="line-clamp-2 text-zinc-400 text-[13px] leading-snug">
                        {item.en.substring(0, 160)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-[10px] text-zinc-600 tracking-widest font-mono">
          BUILT LOCALLY • ALL PROMPTS ARE ORIGINAL RECOMBINATIONS • DATA TRANSFORMED FROM PUBLIC SOURCES ONLY • NSFE METHODOLOGY
        </div>
      </div>
    </div>
  );
};

export default App;