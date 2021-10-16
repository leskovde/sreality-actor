![1](C:\Users\Denis\Downloads\1.png)

tohle je main js kde se definuje crawler, ktery vam prohleda prave webove stranky 

1) je input, ocekava se v JSON Formatu, input naleznete apify_storage/key_value_stores [https://docs.apify.com/actors/running/input](https://docs.apify.com/actors/running/input?fbclid=IwAR36hX04kFFy9yHwvl6EM0bnTSYzH6DjMEJizm0sPBBGXvbX_1H4hG_W4VI) 

2) potom si otevrete requestQueue(RQ)/requestList(RL), lze i oboje, RL je staticke a da se nainicializovat jenom na zacatku, pracuje rychleji  proto pokud nazacatku mate nejaky velky seznam url tak sem, jinak se  pouziva RQ, ktere je dynamicke a da se s nim pracovat i behem behu  crawlera [https://sdk.apify.com/docs/api/request-queue](https://sdk.apify.com/docs/api/request-queue?fbclid=IwAR1xqhWySUUOIrmdNVM_yUcCtP_n3uK2rDJfk-VFDeBsHOh85nj8WHNq9Tg) [https://docs.apify.com/storage/request-queue#javascript-api-client](https://docs.apify.com/storage/request-queue?fbclid=IwAR2GOzEKAKe0Q4DSCV0EVd5BFn06kpoOftWE83q-O541adYoTBh5ItRrPLY#javascript-api-client) 

3) do RQ se dava i userdata pokud chcete, dava se tam urco LABEL, kvuli  handlePageFunction podle toho co s tou strankou chcete delat 

4) proxyna aby vam snizilo sanci na blokaci [https://sdk.apify.com/docs/guides/proxy-management](https://sdk.apify.com/docs/guides/proxy-management?fbclid=IwAR2y5NQO-paDPYuEhsdX5jDGw81cjQsOecSSLLIoHUme1LzLIqxlsTGbXyU) 

5) inicializace crwaleru, dava se tam vsechno co jsme si popsali vyse +  nejake dalsi parametry navic, chrome+stealth udela vaseho bota  nedetekovatelneho, headless pobezi bez toho aby vam lokalne furt  vyskakovali okenka, ale funguje trosku jinak nez kdyz mate head, ale  jenom v malych pripadech 

6) handlePageFunction je funkce, ktera rozhoduje kterou funkci zavolate, aby zpracovala stranku a pak se zavola funkce ze src/routes.js viz  dalsi obrazek [https://sdk.apify.com/docs/typedefs/puppeteer-crawler-options](https://l.facebook.com/l.php?u=https%3A%2F%2Fsdk.apify.com%2Fdocs%2Ftypedefs%2Fpuppeteer-crawler-options%3Ffbclid%3DIwAR0lfIYbU9q0P0ofiCJNXxKIDRHvEaSidwiNqPSEEhjmb_1LAeCPNfnk-Vc&h=AT0xz-UVj7gXIYjvxEWR6V6yMa_rjBjKhhy68GFdJhu0lXdeXDJAM8--mZSriKH8vbomUb8ITeOXAa-UGkA00ET7-NivpG4fhwCE2sdMsMH_WvFzKTtfKWmCIzVAxAhJtjSN6Q) 

7)  volani funkce, muzete si tam pridat parametry ktere chcete, context  se dava vetsinou, ja si sem dal treba requestQueue abych si mohl v tech  metodach pridavat url 

8) samotne volani behu crawlera

   ------

![2](C:\Users\Denis\Downloads\2.png)

tohle jsou samotne routes.js funkce 

1. extrakce dat jsem se daji delat i hromadne, tzn najdu si nejake  elementy ktery maji nejakou stejnou definicipomoci page.$$eval a vevnitr si udealm foreach, co chci hromadne udelat pro ten element 

2. tady si opet pridavam do requestQueue s datama ktery jsem nasel

   ------

![3](C:\Users\Denis\Downloads\3.png)

1) dalsi zpusob extrakce dat je jednotlive a ne hromadne a to pomoci  page.evaluate udelam si nejaky specialni querySelector, ktery  identifikuje jeden element a pak s nim neco provadim  

2) tohle je opet zpusob hromadneho page.$$eval a vevnitr pro kazdy  element delam to same jako v 1), tzn najdu si nejaky querySelector,  ktery presne identifikuje dany element a vezmu to 

3) pokud mam dva objekty a potrebuju je spojit, tak se to dela takto 

4) takhle se pushuje do outputu jako object, nebo jako array of object

   ------

![4](C:\Users\Denis\Downloads\4.png)

1) 2) 3) tady opet jeden element