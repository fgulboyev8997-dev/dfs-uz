# DFS (DeepFake Security) — 3 tilli sayt

## Nima o'zgaradi
- Sayt nomi: **DFS — DeepFake Security** (sarlavha, logo, footer, brauzer yorlig'i).
- Tepa qismda til tugmalari: **UZ | EN | RU**. Standart til — o'zbekcha.
- Barcha matnlar (bosh qism, demo, "Qanday ishlaydi" qadamlari, tugmalar, footer) uch tilda.
- Tanlangan til eslab qolinadi (sahifa qayta ochilganda ham saqlanadi).

## Texnik tafsilotlar
- `src/lib/i18n.ts`: uz/en/ru tarjima lug'ati + `useLang` hook (localStorage, hydration'dan keyin o'qiladi).
- `src/routes/index.tsx`: barcha matnlar lug'atdan olinadi; header'ga til almashtirgich qo'shiladi; head() meta DFS nomiga yangilanadi (o'zbekcha).
- `html lang` atributi tanlangan tilga moslanadi.
