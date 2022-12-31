curl --silent localhost:3000/heroes
# {"results":[{"id":"3df68760-11ca-47d5-bde7-a2b7da7027f6","name":"Batman","age":50,"power":"rich"}]}

curl \
    --silent \
    -X POST \
    -d '{"name": "Flash", "age": 99, "power": "speed" }' \
    localhost:3000/heroes
