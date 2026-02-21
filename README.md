# Cafe Clicker
## Téma hry
Cafe Clicker je webová klikací (idle) hra, ve které hráč buduje vlastní kavárnu. Začíná jako majitel malé kavárny, bez zaměstnanců a nejnovějších technologií. Postupem času však může najmout více zaměstnanců, nakoupit a upgradovat vybavení kavárny.

Hlavním cílem hry je získat nejvíce virtuální měny, investovat do automatizace a postupně odemykat lepší upgrady, díky kterým může exponencionálně zvýšit zisk své kavárny.

## Rozložení UI
- Web obsahuje header s názvem hry, počtem coinů a produkce za sekundu
- Web je rozdělen na čtyři části, z čehož dvě jsou nadesignovány jako obchod
    - První **klikací** část - je určena jako vstup pro uživatele, aby mohl získávat měnu. Tato část bude obsahovat velké tlačítko
    - Druhá **automatizační** část - je určena k nákupu automatizací, které generují zisk za uživatele
    - Třetí část s **vylepšení** - je určena k nákupu permanentních vylepšení, které zvyšují hodnotu produktu
    - Čtvrtá část s **achievementy** - je určena k vyzobrazení achievementů, které uživatel získal, nebo může získat
    
## Herní mechanika
- Hráč kliká na tlačítko "Připravit kávu", čímž získáva virtuální měnu
- Základní klik: +1 coin

Klikání lze zlepšit pomocí upgradů.

## Automatizace
- Hra obsahuje automatizace, které generují zisk bez ohledu, zda hráč kliká
- Každá automatizace má následující vlastnosti:
    - Název
    - Aktuální level
    - Produkce za sekundu
    - Cena za nákup automatizace
    - Násobitel ceny upgradu (např.: 1,5x předchozí ceny)
    - Násobitel produkce po upgradu (např.: 1,5x předchozí produkce)
### Seznam hlavních automatizací
1. Barista
- Základní zaměstnanec kavárny
- Každým levelem zvyšuje produkci kavárny o pevnou hodnotu
2. Kávovar
- Zvyšuje produkci baristů procentuálně
3. Drive-thru
- Rychlejší obsluha zákazníků
- Každým levelem zvyšuje produkci kavárny o pevnou hodnotu
4. Samoobslužné kiosky
- Rychlejší obsluha zákazníků
- Každým levelem zvyšuje produkci kavárny o pevnou hodnotu
5. Další pobočka
- Dvojnásobek aktuální produkce za sekundu

## Upgrady
- Lepší kávová zrna (vyšší cena produktu)
- Dezerty (přidaná hodnota ke kliknutí)
- Školení zaměstnanců (Lépe připravené kafe => větší cena produktu)

## Achievementy
Hra obsahuje systém úspěchů (achievementů), například:
- Dosažení určité částky peněz
- Počet kliknutí
- Počet zakoupených levelů konkrétního itemu
- První dosažení vysoké produkce za sekundu

*Konkrétní achievemnty budou vymyšleny časem*