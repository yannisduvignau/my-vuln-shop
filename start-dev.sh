#!/bin/bash

echo "🚀 Démarrage du backend (nodemon)..."
cd backend
npx nodemon index.js &
BACK_PID=$!

echo "🌐 Démarrage du frontend (npm start)..."
cd ../frontend
npm start &

# Trap CTRL+C pour tuer les processus enfants
trap "echo '🛑 Arrêt en cours...'; kill $BACK_PID; exit" INT

# Attendre que les deux processus tournent
wait
