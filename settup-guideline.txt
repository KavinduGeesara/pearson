# pearson-assignment
follow below steps

1. clone and go inside the repo
2. execute "docker-compose up" command
3. Copy mysql db dump to inside the mysql container and execute "mysql -uroot -p StudentDB < StudentDB_student.sql"
4. Execute below api calls to access Student Registration System.

  i. http://34.69.239.91:3000/test (GET)
  ii.http://34.69.239.91:3000/students (GET)
  iii.http://34.69.239.91:3000/students/<student id> (GET)
  iv.http://34.69.239.91:3000/students/ (POST)
    {  
       "fName": "jeewan ",
       "lName": "Sampath",
       "email": "sampa@gmail.com",
       "password": "Nisal123"
    }
  v.http://34.69.239.91:3000/students/ (PUT)
     {
       "SID": 1,
       "fName": "jeewan ",
       "lName": "Sampath",
       "email": "sampa@gmail.com",
       "password": "Nisal123"
    }
  vi .http://34.69.239.91:3000/students/<student id> (DELETE)
  
  Note: Replace Ip according to your public ip.
