// ========== CONFIG ==========
const PROVIDERS = [
  { id:'openai',   name:'OpenAI GPT-4o',       endpoint:'https://api.openai.com/v1/chat/completions' },
  { id:'deepseek', name:'DeepSeek-V2.5',       endpoint:'https://api.deepseek.com/v1/chat/completions' },
  { id:'gemini',   name:'Google Gemini-Pro',   endpoint:'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent' }
];

// ========== KEYS  (front-end demo only – NEVER do this in production!) ============
const KEYS = {
  openai:   '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',
  deepseek: 'sk-d4593d9677d24d5dab93258adbbb5989',   
  gemini:   'AIzaSyAbgvNrhhJQA62A4eg-0jcDToxQMNw5iF8'
};

// ========== LOGIC ===========
const form   = document.getElementById('askForm');
const resultBox = document.getElementById('results');

form.addEventListener('submit', async e=>{
  e.preventDefault();
  const q = document.getElementById('question').value.trim();
  if(!q) return;
  resultBox.innerHTML='';
  PROVIDERS.forEach(p=>callAI(p,q));
});

async function callAI(p, q){
  const card = document.createElement('div'); card.className='card';
  card.innerHTML=`<h3>${p.name}</h3><pre>Thinking…</pre>`;
  resultBox.appendChild(card);

  try{
    let body, headers;
    if(p.id==='openai'){
      headers={Authorization:`Bearer ${KEYS.openai}`,'Content-Type':'application/json'};
      body=JSON.stringify({model:'gpt-4o',messages:[{role:'user',content:q}],temperature:.7});
    }else if(p.id==='deepseek'){
      headers={Authorization:`Bearer ${KEYS.deepseek}`,'Content-Type':'application/json'};
      body=JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:q}],temperature:.7});
    }else if(p.id==='gemini'){
      headers={};
      body=JSON.stringify({contents:[{parts:[{text:q}]}]});
    }

    const url = p.id==='gemini' ? `${p.endpoint}?key=${KEYS.gemini}` : p.endpoint;
    const r = await fetch(url,{method:'POST',headers,body});
    const dat = await r.json();
    let text='';
    if(p.id==='openai' || p.id==='deepseek') text = dat.choices[0].message.content;
    else if(p.id==='gemini') text = dat.candidates[0].content.parts[0].text;
    card.querySelector('pre').textContent = text;
  }catch(err){
    card.querySelector('pre').textContent='Error: '+err.message;
  }
}