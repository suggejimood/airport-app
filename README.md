# Proje hakkında
Bu proje schiphol havalimanındaki uçakların takibi için geliştirilmişti.

### Back End
* İlk önce back end klasörünün dizinine girin.
* Ardından aşağıdaki komutunu terminal ekranına yazın.
  ```sh
  npm i
  ```
* node_module klasörü oluştuktan ve tüm yüklümeler tamamlandıktan sonra kullanıma hazır.

### DataBase (MongoDB) ###
* Eğer bilgisayarınızda mongodb kurulu değilse aşağıdaki linkler üzerinden indirmeleri gerçekleştiriniz.
* Dökümantasyonunda desteklediği tüm O.S için anlatım mevcut.
##### mongodb
https://www.mongodb.com/docs/guides/server/install/
##### mongodb with compas (Tavsiye edilen)
https://www.mongodb.com/try/download/compass

### Front End
* Back end kodlarında cors orgin olarak 127.0.0.1:5500 tanımlanmıştır bu Live Server eklentisinin yayın yaptığı adrestir.
* Eğer bir web adresinde veya benzeri bir yerde çalıştırılacaksa bu orgin güncellenmelidir.
* not: f.e tarafı düzgün çalışmadığı için postman üzerinden denemeler yapılabilir. Postman klasörü içerisinde gerekli olan json dosyası mevcut.

### Eksikler
##### Back end
* Unit testlerde supertest bir nedenden dolayı testleri gerçekleştiremiyor. 400 veya 401 hatası geri dönüyor.

##### Front End
* Set-Cooike web browsera kayıt olmuyor.
* Cookie olmadığı için çoğu fonksyon çalışmıyor.

## Roadmap
  - [x] User işlemlerinin yapılması.
      - [x] Controller
      - [x] Model
      - [x] Validations
      - [x] Router
  - [x] Booking işlemlerinin yapılması.
      - [x] Controller
      - [x] Model
      - [x] Validations
      - [x] Router
  - [x] Flights işlemlerinin yapılması.
      - [x] Controller
      - [x] Model
      - [x] Validations
      - [x] Router
  - [ ] Dasboard işlemlerinin yapılması.
      - [x] Controller
      - [x] Router
  - [ ] Projenin Dockerise edilmesi
  - [ ] Unit Testlerin yazılması
      - [x] Auth
      - [ ] User
      - [ ] Booking
      - [ ] Flights
      - [ ] Dashboard
