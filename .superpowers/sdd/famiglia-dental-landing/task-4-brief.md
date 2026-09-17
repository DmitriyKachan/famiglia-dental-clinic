# Task 4 Brief: UI Components — Header, Hero & Trust Bar

## Objective
Create responsive, accessible navigation Header, Hero section with high-converting CTA & photos, and Trust Bar statistics.

## Files to Create
- src/components/Header.tsx
- src/components/Hero.tsx
- src/components/TrustBar.tsx
- 	ests/header.test.tsx

## Requirements
1. src/components/Header.tsx:
   - Fixed header with backdrop-blur and subtle border.
   - Logo: 'Famiglia' with cursive/serif aesthetic + subtitle 'Стоматологія твоєї сімʼї' / 'Family Dental Clinic'.
   - Nav links with smooth scrolling anchors: #services, #about, #results, #booking, #contacts.
   - Language switcher (UA / EN) using useI18n().
   - Clickable phone link: 	el:+380960889889.
   - Primary CTA button 'Записатися' scrolling to #booking.
   - Mobile hamburger menu for small screens.
2. src/components/Hero.tsx:
   - Trust badge with star: '★ 4.9 рейтинг у Львові • 15+ років практики'.
   - H1 heading and subtitle from 	.hero.
   - Buttons: 'Записатися на прийом' (accent dark with hover shine) and 'Наші послуги' (outline button).
   - Right side photo composition: founder portrait, warm background badges, clinical quote.
3. src/components/TrustBar.tsx:
   - 4 stats cards: '15+' years experience, '100%' sterility, '1000+' happy smiles, modern digital equipment (CT, microscope).
   - Icons from lucide-react: Award, ShieldCheck, Smile, Microscope.
4. Tests: 	ests/header.test.tsx verifying components render and language switcher toggles properly.

## Report File
Write your report to .superpowers/sdd/famiglia-dental-landing/task-4-report.md.
