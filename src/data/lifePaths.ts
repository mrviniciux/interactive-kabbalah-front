// 22 Paths of the Tree of Life — King Scale (Atziluth) colors from Golden Dawn
export interface LifePathDef {
  from: string;
  to: string;
  number: number;
  letter: string;
  letterName: string;
  sign: string;
  arcane: string;
  meaning: string;
  color: string;
  virtue: string;
  vice: string;
}

export const lifePaths: LifePathDef[] = [
  { from: 'kether', to: 'chokmah', number: 11, letter: 'א', letterName: 'Aleph', sign: '🜁', arcane: '0 - O Louco', meaning: 'Ar / Espírito', color: '#f5f0a0', virtue: 'Não-atadura', vice: 'Idiotice/Instabilidade' },
  { from: 'kether', to: 'binah', number: 12, letter: 'ב', letterName: 'Beth', sign: '☿', arcane: 'I - O Mago', meaning: 'Mercúrio', color: '#f2e600', virtue: 'Astúcia sagaz', vice: 'Falsidade/Desonestidade' },
  { from: 'kether', to: 'tiferet', number: 13, letter: 'ג', letterName: 'Gimel', sign: '☽', arcane: 'II - A Sacerdotisa', meaning: 'Lua', color: '#3355cc', virtue: 'Intuição pura', vice: 'Inconstância' },
  { from: 'chokmah', to: 'binah', number: 14, letter: 'ד', letterName: 'Daleth', sign: '♀', arcane: 'III - A Imperatriz', meaning: 'Vênus', color: '#1f9955', virtue: 'Fecundidade', vice: 'Luxúria/Depravação' },
  { from: 'chokmah', to: 'tiferet', number: 15, letter: 'ה', letterName: 'Heh', sign: '♈', arcane: 'IV - O Imperador', meaning: 'Áries', color: '#e21f1f', virtue: 'Energia serena', vice: 'Impulsividade/Guerra' },
  { from: 'chokmah', to: 'chesed', number: 16, letter: 'ו', letterName: 'Vav', sign: '♉', arcane: 'V - O Hierofante', meaning: 'Touro', color: '#e2531f', virtue: 'Comunicação divina', vice: 'Rebelião contra a lei' },
  { from: 'binah', to: 'tiferet', number: 17, letter: 'ז', letterName: 'Zayin', sign: '♊', arcane: 'VI - Os Enamorados', meaning: 'Gêmeos', color: '#e28f1f', virtue: 'Inspiração equilibrada', vice: 'Indecisão' },
  { from: 'binah', to: 'gevurah', number: 18, letter: 'ח', letterName: 'Cheth', sign: '♋', arcane: 'VII - O Carro', meaning: 'Câncer', color: '#e2c31f', virtue: 'Amor abnegado', vice: 'Introversão excessiva' },
  { from: 'gevurah', to: 'chesed', number: 19, letter: 'ט', letterName: 'Teth', sign: '♌', arcane: 'VIII - A Força', meaning: 'Leão', color: '#d4e21f', virtue: 'Coragem serena', vice: 'Fraqueza/Covardia' },
  { from: 'chesed', to: 'tiferet', number: 20, letter: 'י', letterName: 'Yod', sign: '♍', arcane: 'IX - O Eremita', meaning: 'Virgem', color: '#8fe21f', virtue: 'Prudência silenciosa', vice: 'Rabugice/Isolamento' },
  { from: 'chesed', to: 'netzach', number: 21, letter: 'כ', letterName: 'Kaph', sign: '♃', arcane: 'X - A Roda', meaning: 'Júpiter', color: '#7a1fe2', virtue: 'Adaptação ao destino', vice: 'Ganância/Excesso' },
  { from: 'gevurah', to: 'tiferet', number: 22, letter: 'ל', letterName: 'Lamed', sign: '♎', arcane: 'XI - A Justiça', meaning: 'Libra', color: '#1fe28f', virtue: 'Equilíbrio justo', vice: 'Parcialidade' },
  { from: 'gevurah', to: 'hod', number: 23, letter: 'מ', letterName: 'Mem', sign: '🜄', arcane: 'XII - O Enforcado', meaning: 'Água', color: '#1f5ae2', virtue: 'Autossacrifício', vice: 'Estagnação/Martírio' },
  { from: 'tiferet', to: 'netzach', number: 24, letter: 'נ', letterName: 'Nun', sign: '♏', arcane: 'XIII - A Morte', meaning: 'Escorpião', color: '#1f7a5a', virtue: 'Transformação', vice: 'Apego/Medo' },
  { from: 'tiferet', to: 'yesod', number: 25, letter: 'ס', letterName: 'Samekh', sign: '♐', arcane: 'XIV - A Temperança', meaning: 'Sagitário', color: '#3f6fcc', virtue: 'Síntese harmoniosa', vice: 'Fanatismo' },
  { from: 'tiferet', to: 'hod', number: 26, letter: 'ע', letterName: 'Ayin', sign: '♑', arcane: 'XV - O Diabo', meaning: 'Capricórnio', color: '#33334f', virtue: 'Alegria sóbria', vice: 'Materialismo/Escravidão' },
  { from: 'hod', to: 'netzach', number: 27, letter: 'פ', letterName: 'Peh', sign: '♂', arcane: 'XVI - A Torre', meaning: 'Marte', color: '#cc1f1f', virtue: 'Coragem para destruir o falso', vice: 'Violência gratuita' },
  { from: 'netzach', to: 'yesod', number: 28, letter: 'צ', letterName: 'Tzaddi', sign: '♒', arcane: 'XVII - A Estrela', meaning: 'Aquário', color: '#6f3fcc', virtue: 'Esperança confiante', vice: 'Dispersão/Utopia vazia' },
  { from: 'netzach', to: 'malkuth', number: 29, letter: 'ק', letterName: 'Qoph', sign: '♓', arcane: 'XVIII - A Lua', meaning: 'Peixes', color: '#cc3366', virtue: 'Imaginação criativa', vice: 'Ilusão/Engano' },
  { from: 'hod', to: 'yesod', number: 30, letter: 'ר', letterName: 'Resh', sign: '☉', arcane: 'XIX - O Sol', meaning: 'Sol', color: '#ff8f1f', virtue: 'Vitalidade radiante', vice: 'Vaidade/Orgulho' },
  { from: 'hod', to: 'malkuth', number: 31, letter: 'ש', letterName: 'Shin', sign: '🜂', arcane: 'XX - O Julgamento', meaning: 'Fogo', color: '#e21f1f', virtue: 'Julgamento renovador', vice: 'Fanatismo destrutivo' },
  { from: 'yesod', to: 'malkuth', number: 32, letter: 'ת', letterName: 'Tav', sign: '♄', arcane: 'XXI - O Mundo', meaning: 'Saturno', color: '#3a2a4f', virtue: 'Realização completa', vice: 'Inércia/Estagnação' },
];
