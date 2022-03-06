#!/usr/bin/env bash
#cd frontend/ && yarn start; ls
#(cd ./backend/ && source env/Scripts/activate && cd ./src && flask run) & (cd frontend/ && yarn start )
#(trap 'kill 9' SIGINT; (cd ./backend/ && source env/Scripts/activate && cd ./src && flask run) &  (cd frontend/ && yarn start ))

#Note that this doesnt kill the second process and you gotta manually do it

(cd ./backend/ && source env/Scripts/activate && cd ./src && flask run) #&  (cd frontend/ && yarn start )