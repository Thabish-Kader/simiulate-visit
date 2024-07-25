#!/bin/bash

# URL to be hit
URL="http://localhost:3000/simulation"

# Number of times to hit the URL
COUNT=10

# Loop to hit the URL the specified number of times
for ((i=1; i<=COUNT; i++))
do
    echo "Hitting the URL: Attempt $i"
    curl -s -o /dev/null -w "%{http_code}" $URL
    echo " - Status code: $?"
done

echo "Completed hitting the URL $COUNT times."
