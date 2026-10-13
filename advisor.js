"use strict";
const $=s=>document.querySelector(s);
const ar=document.documentElement.lang==="ar";
let lastReport="";
const tr=(en,arabic)=>ar?arabic:en;
const examples=document.querySelectorAll("[data-process]");
examples.forEach(b=>b.addEventListener("click",()=>{$("#process").value=b.dataset.process;$("#process").focus()}));
const freq={daily:20,weekly:8,monthly:3,occasional:1};
function makeReport(d){
 const {process,tools,issue,sensitive,monthlyHours}=d;
 const benefit={
 time:tr("You could spend less time repeating the same steps and more time on the work that matters.","ممكن تقلّل الوقت اللي بتقضيه في تكرار نفس الخطوات، وتخصص وقت أكبر للشغل المهم."),
 errors:tr("You could avoid typing the same details more than once and reduce common mistakes.","ممكن تقلّل إدخال نفس البيانات أكتر من مرة وتتفادى أخطاء كتير بتحصل من الشغل اليدوي."),
 followups:tr("Updates and reminders could go out on time, without you chasing every message.","التحديثات والتذكيرات ممكن تتبعت في وقتها، من غير ما تفضل تتابع كل رسالة بنفسك."),
 visibility:tr("You could see where work stands without searching through messages and spreadsheets.","ممكن تعرف الشغل وصل لفين بسهولة، بدل ما تدور في الرسائل والجداول.")
 }[issue];
 const care=sensitive==="yes"?tr("Your team would still approve important decisions, and sensitive information would need careful handling.","فريقك هيفضل مسؤول عن الموافقات والقرارات المهمة، مع الاهتمام بحماية البيانات الحساسة."):sensitive==="unsure"?tr("We'd first check if any information needs special care.","أول خطوة هتكون التأكد إذا كانت فيه بيانات محتاجة حماية خاصة."):tr("Your team would stay in control and could review anything unusual.","فريقك هيفضل متحكم في الشغل ويقدر يراجع أي حالة غير معتادة.");
 return [
 tr("YOUR AUTOMATION OPPORTUNITY REPORT","تقرير فرص تحسين شغلك"),"",
 tr("WHAT'S TAKING UP YOUR TIME?","إيه اللي بياخد من وقتك؟"),process,"",
 tr("WHAT COULD BE EASIER?","إيه اللي ممكن يبقى أسهل؟"),benefit,
 tr("Imagine having fewer reminders to send and less information to copy between "+tools+". The important decisions would still be yours.","تخيّل إنك مش محتاج تبعت كل تذكير بنفسك أو تنقل البيانات كل مرة بين "+tools+". والقرارات المهمة تفضل في إيدك."),"",
 tr("HOW MUCH TIME DOES THIS TAKE?","المهمة دي بتاخد وقت قد إيه؟"),
 tr("Based on your answers, you may currently spend about "+monthlyHours+" hours a month on this task. That's time spent today, not a guarantee of time saved.","حسب إجاباتك، ممكن تكون بتقضي حوالي "+monthlyHours+" ساعة كل شهر في المهمة دي. ده تقدير للوقت الحالي، مش وعد إن كل الوقت ده هيتوفّر."),"",
 tr("WHERE SHOULD YOU START?","تبدأ منين؟"),
 tr("Start with one small part of the process, see how well it works, and build from there. ","الأفضل تبدأ بجزء صغير من المهمة، وتجرب النتيجة، وبعدها توسّع خطوة بخطوة. ")+care,"",
 tr("WANT TO EXPLORE THE COST?","حابب تعرف التكلفة؟"),
 tr("ICON AI can discuss what fits your business and provide pricing based on your needs.","تقدر تتواصل مع ICON AI عشان نناقش الحل المناسب لشغلك ونعرفك بالتكلفة حسب احتياجاتك.")
 ].join("\n");
}
$("#advisor-form").addEventListener("submit",e=>{
 e.preventDefault();
 const process=$("#process").value.trim(),tools=$("#tools").value.trim(),frequency=$("#frequency").value,minutes=Number($("#minutes").value),issue=$("#bottleneck").value,sensitive=$("#sensitivity").value;
 if(process.length<12){$("#process").setCustomValidity(tr("Please describe the process in at least 12 characters.","من فضلك اكتب وصف أطول للمهمة (١٢ حرف على الأقل)."));$("#process").reportValidity();return}
 $("#process").setCustomValidity("");
 const monthlyHours=Math.round(freq[frequency]*minutes/60*10)/10;
 const score=(freq[frequency]>=8?2:freq[frequency]>=3?1:0)+(minutes>=60?2:minutes>=30?1:0)+(issue==="errors"||issue==="followups"?1:0);
 const priority=score>=4?tr("High","كبيرة"):score>=2?tr("Moderate","متوسطة"):tr("Exploratory","تحتاج استكشاف");
 lastReport=makeReport({process,tools,issue,sensitive,monthlyHours});
 $("#report-title").textContent=tr("A simpler way to get things done","طريقة أسهل لإنجاز شغلك");
 $("#priority").textContent=priority;
 $("#hours").textContent=monthlyHours+tr(" h/month"," ساعة/شهر");
 $("#blueprint").textContent=lastReport;
 const body=tr("Hello ICON AI, I'd like to discuss my automation opportunity:\n\n","مرحبًا ICON AI، حابب أستفسر عن فرصة الأتمتة دي:\n\n")+lastReport;
 $("#contact-cta").href="mailto:hebaque@ai.icon-ies.com?subject="+encodeURIComponent(tr("Automate My Day — Consultation & Pricing","أتمت يومك — استفسار عن الحلول والأسعار"))+"&body="+encodeURIComponent(body);
 $("#blueprint-wrap").hidden=false;
 $("#blueprint-wrap").scrollIntoView({behavior:"smooth",block:"start"});
});
$("#process").addEventListener("input",()=>$("#process").setCustomValidity(""));
$("#copy-report").addEventListener("click",async()=>{
 if(!lastReport)return;
 try{await navigator.clipboard.writeText(lastReport);$("#copy-report").textContent=tr("Copied!","تم النسخ!")}
 catch{$("#copy-report").textContent=tr("Select the report text to copy","حدّد نص التقرير وانسخه")}
});
