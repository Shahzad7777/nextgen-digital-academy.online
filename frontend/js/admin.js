(() => {
  "use strict";

  const KEYS = {
    courses: "ngda.courses.v1",
    leads: "ngda.leads.v1",
    auth: "ngda.admin.auth.v1"
  };

  const SESSION = "ngda.admin.session.v1";
  const ITERATIONS = 120000;

  const META = {
    "Freelancing": {
      icon: "💻",
      summary: "Build profile positioning, proposals, portfolio proof, pricing, and client communication systems for remote freelance income.",
      outcomes: ["Portfolio proof", "Proposal scripts", "Bidding system", "Client workflow"]
    },
    "Digital Marketing": {
      icon: "📈",
      summary: "Master paid ads, local lead generation, funnels, tracking, and campaign optimization for real businesses.",
      outcomes: ["Ad strategy", "Campaign setup", "Analytics", "Optimization"]
    },
    "Video & Content Creation": {
      icon: "🎬",
      summary: "Create high-retention reels, shorts, YouTube automation assets, editing workflows, and AI-assisted content systems.",
      outcomes: ["Hooks", "Editing workflow", "Content calendar", "YouTube packaging"]
    }
  };

  const DEFAULT_COURSES = [
    course("course-freelance-accelerator","Upwork & Fiverr USD Freelancing Accelerator","Freelancing",35000,"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85","💻","Beginner to Client-Ready",[
      ["Market Positioning & Profile Foundation",["Choose a profitable freelance niche based on Pakistani strengths and global demand.","Build Upwork and Fiverr profiles with trust-focused headlines, descriptions, FAQs, and offers.","Create a simple service ladder from entry offer to premium package."]],
      ["Portfolio Assets & Proof Creation",["Create 3 portfolio samples even with zero previous clients using realistic mock projects.","Write case-study descriptions showing problem, process, and result.","Package your proof into Google Drive, Behance, Notion, or a landing page."]],
      ["Bidding, Proposals & Client Psychology",["Write custom proposals using hook, diagnosis, proof, plan, and CTA.","Avoid beginner mistakes that trigger rejection and low pricing.","Build a daily bidding pipeline with tracking and follow-ups."]],
      ["Closing, Delivery & Retention",["Handle discovery questions, scope, timelines, revisions, and payment expectations.","Deliver projects with clean checklists and client approval steps.","Create upsells, repeat-work offers, and testimonial systems."]]
    ]),
    course("course-agency-career","Freelance Agency Career Blueprint","Freelancing",42000,"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85","🚀","Intermediate",[
      ["Agency Niche & Offer Engineering",["Select a repeat-demand niche such as ads, content, editing, websites, or lead generation.","Design monthly packages with deliverables, timelines, and retainer logic.","Write a positioning statement that makes your agency easy to trust."]],
      ["Lead Generation & Outreach Systems",["Build prospect lists using local businesses, LinkedIn, Facebook groups, and referrals.","Write cold messages that diagnose pain without sounding desperate.","Create follow-up sequences and a simple CRM board."]],
      ["Fulfillment, SOPs & Delegation",["Create SOPs for onboarding, delivery, revision management, and reporting.","Learn when to outsource editing, design, media buying, or admin tasks.","Build quality-control checklists to protect client trust."]],
      ["Retainers, Reporting & Scale",["Create monthly reports that show activities, numbers, insights, and next steps.","Handle renewal conversations and reduce churn.","Plan lean agency growth without unnecessary expenses."]]
    ]),
    course("course-meta-google-ads","Meta & Google Ads Revenue Mastery","Digital Marketing",45000,"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85","📈","Beginner to Performance-Ready",[
      ["Marketing Fundamentals & Offer Strategy",["Understand awareness, consideration, conversion, and retargeting stages.","Create offers for services, ecommerce, local shops, and academies.","Map customer objections and turn them into ad angles."]],
      ["Meta Ads Setup & Creative Testing",["Set up objectives, ad sets, budgets, placements, and audiences.","Write direct-response copy with hooks, benefits, proof, and CTAs.","Plan creative tests for images, reels, carousels, and UGC ads."]],
      ["Google Ads, Keywords & Intent Capture",["Understand search intent, keyword match types, negatives, and quality signals.","Build search campaigns for local services and lead generation.","Create landing-page trust and conversion checklists."]],
      ["Tracking, Optimization & Reporting",["Read CTR, CPC, CPM, conversion rate, ROAS, CPA, and lead quality.","Make optimization decisions without killing campaigns too early.","Prepare client reports with numbers, insights, and next actions."]]
    ]),
    course("course-local-business-growth","Local Business Ads & WhatsApp Sales System","Digital Marketing",30000,"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85","🏢","Business Owner Friendly",[
      ["Local Market Diagnosis & Offer Building",["Identify customer pain points, competitors, and profitable products/services.","Create offers with urgency, proof, guarantee language, and WhatsApp CTAs.","Build a journey from ad click to inquiry to sale."]],
      ["Facebook, Instagram & Local Targeting",["Set up geo-targeted campaigns by city, radius, interests, and custom audiences.","Design creatives using local proof, testimonials, demos, and before-after visuals.","Use WhatsApp campaigns and lead forms with qualification questions."]],
      ["Sales Scripts & Follow-Up Automation",["Write WhatsApp replies for price objections, appointment booking, and urgency.","Create follow-up sequences for cold, warm, and ready leads.","Build a simple spreadsheet CRM for daily lead management."]],
      ["Optimization & Scaling",["Read lead quality, cost per lead, conversion rate, and profit signals.","Improve campaigns using creative testing, audience refinement, and offers.","Create a monthly local growth plan with budget control."]]
    ]),
    course("course-video-reels-youtube","Reels, Shorts & YouTube Automation Studio","Video & Content Creation",32000,"https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=85","🎬","Creator to Monetization-Ready",[
      ["Content Strategy & Viral Hook Psychology",["Understand attention, retention, curiosity gaps, and platform behavior.","Create pillars for education, entertainment, authority, and sales.","Write hooks for reels, shorts, TikTok-style videos, and YouTube intros."]],
      ["Editing Workflow & Retention Design",["Build workflows for captions, cuts, music, B-roll, overlays, and pacing.","Use rhythm, zooms, effects, and text hierarchy without over-editing.","Create reusable templates for short-form production."]],
      ["YouTube Automation & Packaging",["Research niches, titles, thumbnails, competitors, and viewer intent.","Plan scripts, voiceovers, stock footage, editing briefs, and publishing workflows.","Create channel packaging with playlists, descriptions, and upload systems."]],
      ["Content Monetization & Client Services",["Turn editing skill into freelance packages for creators and businesses.","Build monthly content retainers, sample packs, and outreach scripts.","Track retention, watch time, saves, shares, and conversion signals."]]
    ]),
    course("course-ai-content-engine","AI Content Engine for Creators & Brands","Video & Content Creation",28000,"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85","🤖","Beginner Friendly",[
      ["AI Research & Content Positioning",["Use AI to research audiences, pain points, competitors, and content gaps.","Create brand voice rules so content does not sound robotic.","Build idea banks for reels, carousels, newsletters, and YouTube videos."]],
      ["Prompting, Scripting & Repurposing",["Write prompts for hooks, outlines, scripts, captions, and email content.","Repurpose one long idea into shorts, posts, threads, and newsletters.","Edit AI output for accuracy, local relevance, and human tone."]],
      ["Design, Editing & Publishing Workflow",["Turn scripts into content briefs for Canva, CapCut, Premiere, or mobile editing.","Create scheduling systems for daily and weekly publishing.","Build approval checklists for creators, brands, and clients."]],
      ["Content Services & Monetization",["Package AI-assisted services for small businesses and personal brands.","Price monthly content calendars, scripting, editing coordination, and page management.","Create reports with reach, engagement, saves, leads, and sales impact."]]
    ])
  ];

  const el = {};
  let toastTimer = null;

  document.addEventListener("DOMContentLoaded", init);

  function init(){
    ["lockScreen","dashboard","authForm","adminPin","authMode","authHelp","authSubmit","logout","restoreDefaults","totalCourses","totalLeads","projectedRevenue","courseProgress","leadProgress","revenueProgress","courseForm","courseList","leadRows","csvOutput","copyCsv","downloadCsv","toast"].forEach(id=>el[id]=document.getElementById(id));
    ensureDefaults();
    bind();
    initAuth();
  }

  function bind(){
    el.authForm.addEventListener("submit",authSubmit);
    el.logout.addEventListener("click",lock);
    el.restoreDefaults.addEventListener("click",restoreDefaults);
    el.courseForm.addEventListener("submit",createCourse);
    el.courseList.addEventListener("click",deleteCourse);
    el.leadRows.addEventListener("click",toggleLeadStatus);
    el.copyCsv.addEventListener("click",copyCsv);
    el.downloadCsv.addEventListener("click",downloadCsv);
    window.addEventListener("storage",e=>{if([KEYS.courses,KEYS.leads].includes(e.key)&&unlocked())render();});
  }

  function course(id,title,category,price,image,icon,level,weeks){
    const meta=META[category];
    return {id,title,category,price,image,icon,level,duration:"4 Weeks",summary:meta.summary,outcomes:meta.outcomes,syllabus:weeks.map((w,i)=>({week:i+1,title:w[0],bullets:w[1]}))};
  }

  function initAuth(){
    const auth=read(KEYS.auth,null);
    const first=!auth?.hash || !auth?.salt;
    el.authMode.textContent=first?"First-time setup":"Admin access";
    el.authHelp.textContent=first?"Create a strong local admin PIN with at least 8 characters. It will be hashed in this browser.":"Enter your local admin PIN to unlock the dashboard.";
    el.authSubmit.textContent=first?"Create PIN & Unlock":"Unlock Dashboard";
    if(!first && sessionStorage.getItem(SESSION)==="unlocked") showDashboard(); else showLock();
  }

  async function authSubmit(e){
    e.preventDefault();
    if(!crypto?.subtle){toast("Secure crypto is unavailable. Use HTTPS or localhost.");return;}
    const pin=String(el.adminPin.value||"");
    if(pin.length<8){toast("Use at least 8 characters.");return;}

    const auth=read(KEYS.auth,null);
    try{
      el.authSubmit.disabled=true;
      el.authSubmit.textContent="Verifying...";
      if(!auth?.hash || !auth?.salt){
        const salt=hex(crypto.getRandomValues(new Uint8Array(16)));
        const hash=await derive(pin,salt);
        save(KEYS.auth,{salt,hash,iterations:ITERATIONS,createdAt:new Date().toISOString()});
        sessionStorage.setItem(SESSION,"unlocked");
        el.adminPin.value="";
        showDashboard();
        toast("Admin PIN created. Dashboard unlocked.");
        return;
      }
      const incoming=await derive(pin,auth.salt);
      if(equal(incoming,auth.hash)){
        sessionStorage.setItem(SESSION,"unlocked");
        el.adminPin.value="";
        showDashboard();
        toast("Dashboard unlocked.");
      }else toast("Incorrect admin PIN.");
    }catch{
      toast("Authentication failed. Please retry.");
    }finally{
      el.authSubmit.disabled=false;
      el.authSubmit.textContent=read(KEYS.auth,null)?.hash?"Unlock Dashboard":"Create PIN & Unlock";
    }
  }

  function showDashboard(){el.lockScreen.hidden=true;el.dashboard.hidden=false;render();}
  function showLock(){el.lockScreen.hidden=false;el.dashboard.hidden=true;}
  function lock(){sessionStorage.removeItem(SESSION);showLock();toast("Admin dashboard locked.");}
  function unlocked(){return sessionStorage.getItem(SESSION)==="unlocked";}

  function render(){
    const courses=getCourses();
    const leads=getLeads();
    const revenue=leads.reduce((s,l)=>s+Number(l.coursePrice||0),0);

    el.totalCourses.textContent=String(courses.length);
    el.totalLeads.textContent=String(leads.length);
    el.projectedRevenue.textContent=money(revenue);
    el.courseProgress.value=pct(courses.length/12*100);
    el.leadProgress.value=pct(leads.length/100*100);
    el.revenueProgress.value=pct(revenue/1000000*100);

    renderCourses(courses);
    renderLeads(leads);
    el.csvOutput.value=csv(leads);
  }

  function renderCourses(courses){
    el.courseList.innerHTML=courses.length?courses.map(c=>{
      c=normalizeCourse(c);
      return `<article class="course-admin">
        <img src="${safeUrl(c.image)}" alt="${h(c.title)} cover" loading="lazy">
        <div><h3>${h(c.icon)} ${h(c.title)}</h3><p>${h(c.category)} • ${money(c.price)} • ${h(c.duration)}</p></div>
        <button type="button" class="delete-btn" data-id="${h(c.id)}">Delete</button>
      </article>`;
    }).join(""):`<div class="empty"><h3>No courses available</h3><p>Create a course or restore defaults.</p></div>`;
  }

  function renderLeads(leads){
    el.leadRows.innerHTML=leads.length?leads.map(l=>{
      const s=status(l.status), cls=s.toLowerCase();
      return `<tr>
        <td>${h(date(l.createdAt))}</td>
        <td>${h(l.studentName||"Unknown")}</td>
        <td>${h(l.email||"No email")}</td>
        <td>${h(l.courseTitle||"Deleted course")}</td>
        <td>${h(money(l.coursePrice||0))}</td>
        <td><button type="button" class="status-btn ${h(cls)}" data-id="${h(l.id)}">${h(s)}</button></td>
      </tr>`;
    }).join(""):`<tr><td colspan="6">No enrollment leads yet.</td></tr>`;
  }

  function createCourse(e){
    e.preventDefault();
    const fd=new FormData(el.courseForm);
    const title=clean(fd.get("title"),120);
    const category=clean(fd.get("category"),80);
    const price=Number(fd.get("price"));
    const image=safeUrl(fd.get("image"));
    const syllabusText=String(fd.get("syllabus")||"").trim();

    if(!title){toast("Course title is required.");return;}
    if(!META[category]){toast("Select a valid category.");return;}
    if(!Number.isFinite(price)||price<1000){toast("Course price must be at least PKR 1,000.");return;}
    if(syllabusText.length<40){toast("Enter a detailed week-by-week syllabus.");return;}

    const meta=META[category];
    const newCourse={
      id:id("course"),
      title,category,price,image,
      icon:meta.icon,
      level:"Career-Ready",
      duration:"4 Weeks",
      summary:`${title} is a premium 4-week NextGen Digital Academy program for Pakistani learners. ${meta.summary}`,
      outcomes:meta.outcomes,
      syllabus:parseSyllabus(syllabusText)
    };

    save(KEYS.courses,[newCourse,...getCourses()]);
    el.courseForm.reset();
    render();
    toast("Course created and synced to frontend catalog.");
  }

  function deleteCourse(e){
    const btn=e.target.closest("[data-id]");
    if(!btn) return;
    const courses=getCourses();
    const c=courses.find(x=>x.id===btn.dataset.id);
    if(!c){toast("Course not found.");return;}
    if(!confirm(`Delete "${c.title}" from the live catalog?`)) return;
    save(KEYS.courses,courses.filter(x=>x.id!==btn.dataset.id));
    render();
    toast("Course deleted.");
  }

  function toggleLeadStatus(e){
    const btn=e.target.closest("[data-id]");
    if(!btn) return;
    const leads=getLeads().map(l=>l.id===btn.dataset.id?{...l,status:nextStatus(l.status),statusUpdatedAt:new Date().toISOString()}:l);
    save(KEYS.leads,leads);
    render();
    toast("Lead status updated.");
  }

  function restoreDefaults(){
    if(!confirm("Restore the default premium catalog? Existing custom courses will be replaced.")) return;
    save(KEYS.courses,clone(DEFAULT_COURSES));
    render();
    toast("Default courses restored.");
  }

  async function copyCsv(){
    try{await navigator.clipboard.writeText(el.csvOutput.value);toast("CSV copied to clipboard.");}
    catch{el.csvOutput.select();document.execCommand("copy");toast("CSV selected and copied.");}
  }

  function downloadCsv(){
    const blob=new Blob([el.csvOutput.value],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`nextgen-digital-academy-leads-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast("CSV download started.");
  }

  function parseSyllabus(text){
    const cleaned=String(text||"").replace(/\r/g,"").trim();
    const sections=cleaned.split(/(?=Week\s*[1-4]\s*[:\-])/i).map(x=>x.trim()).filter(Boolean);
    if(sections.length>=4){
      return [1,2,3,4].map(n=>{
        const sec=sections.find(x=>new RegExp(`Week\\s*${n}\\s*[:\\-]`,"i").test(x))||"";
        const body=sec.replace(new RegExp(`^Week\\s*${n}\\s*[:\\-]?`,"i"),"").trim();
        const parts=body.split(/\n|;|•|- /).map(x=>x.trim()).filter(Boolean);
        return {week:n,title:clean(parts[0]||weekTitle(n),90),bullets:bullets(parts.length>1?parts.slice(1):[body])};
      });
    }
    const lines=cleaned.split(/\n|;|•|- /).map(x=>x.trim()).filter(Boolean);
    const size=Math.max(1,Math.ceil(lines.length/4));
    return [1,2,3,4].map(n=>({week:n,title:weekTitle(n),bullets:bullets(lines.slice((n-1)*size,(n-1)*size+size))}));
  }

  function bullets(items){
    const b=items.map(x=>clean(x,180)).filter(Boolean).slice(0,8);
    return b.length>=3?b:[...b,"Complete guided practical implementation tasks.","Build portfolio-ready proof and review your execution.","Prepare next-step actions for real market use."].slice(0,4);
  }

  function weekTitle(n){
    return ({1:"Foundation & Market Clarity",2:"Practical Workflow & Execution",3:"Portfolio, Client, or Campaign Simulation",4:"Launch, Optimization & Growth System"})[n]||"Weekly Execution Roadmap";
  }

  function csv(leads){
    const head=["Lead ID","Created At","Student Name","Email","Course ID","Course Title","Category","Price PKR","Status","Payment Account Title","Payment Channels","Source"];
    const rows=leads.map(l=>[l.id,l.createdAt,l.studentName,l.email,l.courseId,l.courseTitle,l.courseCategory,l.coursePrice,status(l.status),l.paymentAccountTitle||"Shahzad Hassan",l.paymentChannels||"JazzCash / EasyPaisa / Meezan Bank",l.source||"frontend_checkout"]);
    return [head,...rows].map(r=>r.map(csvCell).join(",")).join("\n");
  }

  function csvCell(v){const t=String(v??"");return /[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}
  function status(s){return ["Pending","Approved","Rejected"].includes(s)?s:"Pending"}
  function nextStatus(s){return ({Pending:"Approved",Approved:"Rejected",Rejected:"Pending"})[status(s)]}
  function ensureDefaults(){if(!Array.isArray(read(KEYS.courses,null))||!read(KEYS.courses,[]).length)save(KEYS.courses,clone(DEFAULT_COURSES));if(!Array.isArray(read(KEYS.leads,null)))save(KEYS.leads,[])}
  function getCourses(){const c=read(KEYS.courses,[]);return Array.isArray(c)&&c.length?c.map(normalizeCourse):clone(DEFAULT_COURSES)}
  function getLeads(){const l=read(KEYS.leads,[]);return Array.isArray(l)?l:[]}
  function normalizeCourse(c){const meta=META[c.category]||META.Freelancing;return{id:clean(c.id||id("course"),100),title:clean(c.title||"NextGen Digital Skill Program",120),category:clean(c.category||"Freelancing",80),price:Number.isFinite(Number(c.price))?Number(c.price):0,image:safeUrl(c.image),icon:clean(c.icon||meta.icon,8),level:clean(c.level||"Career-Ready",80),duration:clean(c.duration||"4 Weeks",40),summary:clean(c.summary||meta.summary,420),outcomes:Array.isArray(c.outcomes)?c.outcomes.map(x=>clean(x,80)):meta.outcomes,syllabus:Array.isArray(c.syllabus)?c.syllabus:parseSyllabus("Week 1: Foundation\nWeek 2: Workflow\nWeek 3: Simulation\nWeek 4: Launch")}}
  function read(k,f){try{const r=localStorage.getItem(k);return r?JSON.parse(r):f}catch{return f}}
  function save(k,v){localStorage.setItem(k,JSON.stringify(v));window.dispatchEvent(new CustomEvent("ngda:state-change",{detail:{key:k}}))}
  function clean(v,n){return String(v??"").replace(/\s+/g," ").trim().slice(0,n)}
  function h(v){return String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]))}
  function safeUrl(v){const fallback="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85";try{const u=new URL(String(v||fallback),location.href);return ["http:","https:"].includes(u.protocol)?u.href:fallback}catch{return fallback}}
  function money(n){return new Intl.NumberFormat("en-PK",{style:"currency",currency:"PKR",maximumFractionDigits:0}).format(Number(n)||0)}
  function date(v){const d=new Date(v);return Number.isNaN(d.getTime())?"Unknown":d.toLocaleString("en-PK",{year:"numeric",month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit"})}
  function pct(v){return Math.max(0,Math.min(100,Math.round(Number(v)||0)))}
  function id(p){return crypto.randomUUID?`${p}-${crypto.randomUUID()}`:`${p}-${Date.now()}-${Math.random().toString(16).slice(2)}`}
  function clone(v){return JSON.parse(JSON.stringify(v))}
  function toast(msg){clearTimeout(toastTimer);el.toast.textContent=msg;el.toast.classList.add("show");toastTimer=setTimeout(()=>el.toast.classList.remove("show"),3600)}
  async function derive(secret,saltHex){const enc=new TextEncoder();const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"PBKDF2"},false,["deriveBits"]);const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:bytes(saltHex),iterations:ITERATIONS,hash:"SHA-256"},key,256);return hex(new Uint8Array(bits))}
  function hex(bytesArr){return Array.from(bytesArr).map(b=>b.toString(16).padStart(2,"0")).join("")}
  function bytes(hexStr){const clean=String(hexStr||"").replace(/[^a-f0-9]/gi,"");const out=new Uint8Array(clean.length/2);for(let i=0;i<out.length;i++)out[i]=parseInt(clean.slice(i*2,i*2+2),16);return out}
  function equal(a,b){a=String(a||"");b=String(b||"");if(a.length!==b.length)return false;let r=0;for(let i=0;i<a.length;i++)r|=a.charCodeAt(i)^b.charCodeAt(i);return r===0}
})();
