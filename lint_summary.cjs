const d=JSON.parse(require('fs').readFileSync('lint.json','utf8'));
for(const f of d){
  if(!f.messages.length) continue;
  const rel=f.filePath.replace(/.*immersive-portfolio[\/]/,'');
  const rules={};
  for(const m of f.messages){ rules[m.ruleId]=(rules[m.ruleId]||0)+1; }
  console.log(rel, JSON.stringify(rules));
}
