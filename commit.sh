#!/bin/bash

if [ -n "$1" ]
then
    if (( $1 == "c" ))
    then 
        git add .
        git commit -m "$1"
        git log 
    elif (( $1 == "p" ))
    then
        git push
    else
        echo "Give an argument please"
    fi
fi