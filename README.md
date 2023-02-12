Library Service
---

Документация API:
---

    - POST    api/v1/auth/login - авторизироваться
	- POST    api/v1/auth/registration - зарегистрироваться
	
	- POST    api/v1/books/ - добавить новую книгу
    - PUT     api/v1/books/{int:id}/give - выдать книгу с id
	- PUT     api/v1/books/{int:id}/return - вернуть книгу с id
	
	- POST    api/v1/roles/ - добавить новую роль

	- POST    api/v1/subs/ - купить абонемент

	- GET     api/v1/users/ - получить всех пользователей
	- POST    api/v1/users/ - добавить нового пользователя
	- GET     api/v1/users/{int:pk}/ получить подробную информацию о пользователе по его id 
	- PUT     api/v1/users/{int:pk}/ изменить данные пользователя по его id
	- DELETE  api/v1/users/{int:pk}/ удалить пользователя по ее id

		