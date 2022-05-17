### Back End ##
İlk önce back end dosyasının dizinine gelin.
Ardından 'npm i' komutunu consol'a girin.
node_module dosyası oluştuktan ve tüm yüklümeler tamamlandıktan sonra kullanıma hazır.

### DataBase (MongoDB) ###
Eğer bilgisayarınızda mongodb kurulu değilse aşağıdaki linkler üzerinden indirmeleri gerçekleştiriniz.
Dökümantasyonunda desteklediği tüm O.S için anlatım mevcut.
-mongodb
https://www.mongodb.com/docs/guides/server/install/
-mongodb with compas (Tavsiye edilen)
https://www.mongodb.com/try/download/compass

### Front End ###
Back end kodlarında cors orgin olarak 127.0.0.1:5500 tanımlanmıştır bu Live Server eklentisinin yayın yaptığı adrestir.
Eğer bir web adresinde veya benzeri bir yerde çalıştırılacaksa bu orgin güncellenmelidir.

### Eksikler ##
--Back end--
    -Unit testlerde supertest bir nedenden dolayı testleri gerçekleştiremiyor. 400 veya 401 hatası geri dönüyor.

--Front End--
    -Set-Cooike web browsera kayıt olmuyor.
    -Cookie olmadığı için çoğu fonksyon çalışmıyor.