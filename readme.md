Test assignment for the front-end developer position applicants
----
This repository contains the back-end component for a game of **tic-tac-toe** against the AI. Your assignment is to develop the front-end.

Upon completing the assignment, you are supposed to deliver a fork of this repository. Cloning the fork, invoking `npm-start`, and running http://localhost:3000 in a browser should open a working SPA application that meets the requirements below.

You are required to use a multitude of frameworks, libraries and other tools for development simplification and acceleration. The inherent scalability and mobile devices support are also mandatory.

# Requirements
- The front-end presents the interface for a game of tic-tac-toe against the AI (back-end implementation supplied).
- Interaction with the AI and acquisition of data about the current game and previous games are performed via the REST API.
- The application screens includes the following elements:
  - The main game screen:
    - *(`X`, `O`)* commands, one for the player, the other for the AI
    - gameboard
    - log of the moves in the current round.
  - The scoreboard
    - scores of all previously played rounds
    - the total of wins and losses *(player:AI, Х:О)*
- The game should not be interrupted by switching between screens
- The game should be mostly mouse-controlled

# Game rules
Obviously, the general rules conform to the classical tic-tac-toe game. Xs go first. In the first game upon the server launch the player is X, the UI is O. In each subsequent round, they swap places. The number of rounds is not limited. In each round the player is opposed by the AI.

# API
The API documentation is generated via the [Postman collection](https://documenter.getpostman.com/view/1050162/frontend-testcase/7TFGFKr).
Add this collection for the enhancement and simplification of your development process.

# Back-end
The back-end requires the current version of `nodejs`. It is launched by `npm start`.
No database is used, therefore all rounds, including the current one, are lost if the server is restarted.
The entire configuration is contained in the `./config.json` file. It also includes the `app.front_path` parameter that you might need to modify if your application is compiled in an alternative location.

----

Тестовое задание для кандидатов на позицию фронтенд-разработчика
----
В этой репе лежит бекенд для игры в **крестики-нолики** против ИИ. Ваша задача - написать фронтенд.

**Результатом вашей работы** будет форк этого репозитория, склонировав который, запустив `npm start` и открыв в браузере http://localhost:3000 можно будет увидеть работающее SPA приложение, которе удовлетворяет требованиям описанным ниже.

Нужно использовать всевозможные фреймворки, библиотеки и прочие инструменты упрощения и ускорения разработки. Масштабируемую архитектуру и поддержку мобильных устройств также необходимо предусмотреть.

# Требования
- фронтенд должен представлять интерфейс для игры в крестики-нолики против ИИ (ИИ реализован на бекенеде)
- взаимодействие с ИИ и полученние данных о текущей игре прошедших играх происходит через REST api
- элементы экранов приложения
  - экран игры:
      - комманды *(`X`,`O`)* игрока и ИИ
      - игровая доска
      - лог ходов текущей партии
  - экран счетов
      - результаты всех сыгранных игр
      - общий счёт побед/поражений *(игрок:ИИ, Х:О)*
- игра не должна прерываться при переключении между экранами
- управление в первую очередь мышкой

# Правила игры
Общие правила, разумеется, соответствуют классическим крестикам-ноликам.
Крестики ходят первыми.
В первой игре (с момента запуска сервера) игрок играет за крестиков, а ИИ за ноликов.
Каждую следующую игру игрок и ИИ меняются местами.
Количество партий не ограничено.
Все игры - игрок против ИИ.

# API
Документация к Апи сделана через [коллекцию Postman](https://documenter.getpostman.com/view/1050162/frontend-testcase/7TFGFKr)

Для упрощения и ускорения работы добавьте к себе эту коллекцию

# Бекенд
Бекенд требует актуальной версии `nodejs`.
Его можно запустить через `npm start`.

Никакой БД не используется, так что все партии, включая текущую, пропадают с перезапуском сервера.

Весь конфиг представлен в файле `./config.json`. Включая `app.front_path` который возможно вам понадобится изменить если ваше приложение будет компилировать в другое место
