#!/bin/bash

if (( $? == "c" ))
then
    git add .
    git commit -m "$?"
    git log 
elif (( $? == "p" ))
then
    git push
else
    echo "Give an argument please"
fi