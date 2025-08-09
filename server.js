const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

const celebrityPairs = [
    // === İNTERNET, EKRAN & MİZAH DÜNYASI ===
    // Twitch Yayıncıları
    ["Jahrein (Ahmet Sonuç)", "Elraenn (Tuğkan Gönültaş)"],
    ["Pqueen (Pelin Baynazoğlu)", "Kendine Müzisyen (Kemal Can Parlak)"],
    ["wtcN (Ferit Karakaya)", "Mithrain (Cem Karakoç)"],
    ["Levo (Mustafa Keloğlu)", "Elwind (Kaan Atıcı)"],
    ["Zade (Furkan Civan)", "Hype (Gökay Eser)"],
    ["Anna Deniz", "Miafitz (Gözde Demiral)"],
    
    // YouTuber'lar (Eğlence)
    ["Enes Batur", "Orkun Işıtmak"],
    ["Reynmen (Yusuf Aktaş)", "Berkcan Güven"],
    ["Kafalar (Atakan, Fatih, Bilal)", "Alper Rende"],
    ["Ali Biçim", "Mesut Can Tomay"],
    ["Deli Mi Ne? (Fester Abdü)", "Fırat Sobutay (OHA Diyorum)"],
    ["Meryem Can", "Başak Karahan"],
    ["Aykut Elmas", "Halil İbrahim Göker"],
    
    // YouTuber'lar (Bilgi & Kültür)
    ["Barış Özcan", "Ruhi Çenet"],
    ["Evrim Ağacı (Çağrı Mert Bakırcı)", "Ayhan Tarakcı"],
    ["Videoyun (Can Sungur)", "Orhun Kayaalp"],
    ["Mendebur Lemur", "Efe Aydal"],
    
    // Instagram & TikTok Fenomenleri
    ["Danla Bilic", "Duygu Özaslan"],
    ["Cemre Solmaz", "Yaren Alaca"],
    ["Cellat36 (Özgür Deniz)", "Berke Juan"],
    ["Şeyma Subaşı", "Rachel Araz"],
    ["Uzun Makarna (Özkan Sağın)", "Sıla Dündar"],
    
    // Komedyenler ve Sunucular
    ["Cem Yılmaz", "Ata Demirer"],
    ["Hasan Can Kaya", "Doğu Demirkol"],
    ["Beyazıt Öztürk", "Acun Ilıcalı"],
    ["İbrahim Selim", "Kaan Sekban"],
    ["Müge Anlı", "Esra Erol"],
    ["Şahan Gökbakar", "Tolga Çevik"],

    // Yemek Fenomenleri
    ["CZN Burak", "Nusret Gökçe"],
    ["Somer Sivrioğlu", "Danilo Zanna"],
    ["Arda Türkmen", "Refika Birgül"],
    
    // === MÜZİK DÜNYASI ===
    ["Lvbel C5", "Çakal"],
    ["Uzi", "Reckol"],
    ["Sefo", "Murda"],
    ["Blok3", "Motive"],
    ["Güneş", "Simge Sağın"],
    ["Tarkan", "Murat Boz"],
    ["Sezen Aksu", "Sertab Erener"],
    ["Müslüm Gürses", "Ferdi Tayfur"],
    ["Teoman", "Haluk Levent"],
    ["Edis", "Buray"],
    ["Mabel Matiz", "Emir Can İğrek"],
    ["Gülşen", "Hande Yener"],
    ["Melek Mosso", "Melike Şahin"],
    
    // === FUTBOL DÜNYASI ===
    ["Arda Güler", "Can Uzun"],
    ["Hakan Çalhanoğlu", "Mesut Özil"],
    ["Kerem Aktürkoğlu", "Barış Alper Yılmaz"],
    ["Mauro Icardi", "Edin Dzeko"],
    ["Alex de Souza", "Gheorghe Hagi"],
    ["Fatih Terim", "Mustafa Denizli"],
    ["Sergen Yalçın", "Rıdvan Dilmen"],
    ["Ricardo Quaresma", "Guti Hernández"],
    
    // === SİNEMA & DİZİ DÜNYASI ===
    ["Kıvanç Tatlıtuğ", "Çağatay Ulusoy"],
    ["Kenan İmirzalıoğlu", "Burak Özçivit"],
    ["Hande Erçel", "Demet Özdemir"],
    ["Serenay Sarıkaya", "Fahriye Evcen"],
    ["Afra Saraçoğlu", "Sıla Türkoğlu"],
    ["Beren Saat", "Tuba Büyüküstün"],
    ["Pınar Deniz", "Cemre Baysel"],
    ["Mert Ramazan Demir", "Kubilay Aka"],
    ["Türkan Şoray", "Filiz Akın"],
    ["Şener Şen", "Kemal Sunal"],
];

const games = {}; 
const MAX_ROUNDS = 3;

function handlePlayerLeave(socketId, roomId) {
    const game = games[roomId];
    if (!game) return;
    const playerIndex = game.players.findIndex(player => player.id === socketId);
    if (playerIndex !== -1) {
        game.players.splice(playerIndex, 1);
        io.to(roomId).emit('user-disconnected', socketId);
        if (game.players.length === 0) {
            delete games[roomId];
        } else if (game.gameState !== 'lobby' && game.players.length < 3) {
            io.to(roomId).emit('gameCancelled', 'Yeterli oyuncu kalmadığı için oyun iptal edildi.');
            delete games[roomId];
        } else {
            io.to(roomId).emit('updateGameData', game);
        }
    }
}

io.on('connection', (socket) => {
    socket.on('createRoom', ({ playerName, avatar, playerLimit, winScore }) => {
        const roomId = Math.floor(1000 + Math.random() * 9000).toString(); 
        socket.join(roomId);
        games[roomId] = {
            players: [{ id: socket.id, name: playerName, avatar: avatar, score: 0 }],
            gameState: 'lobby',
            currentRound: 0,
            maxPlayers: parseInt(playerLimit, 10),
            scoreToWin: parseInt(winScore, 10),
        };
        socket.emit('roomCreated', roomId);
        io.to(roomId).emit('updateGameData', games[roomId]);
    });

    socket.on('joinRoom', ({ roomId, playerName, avatar }) => {
        const game = games[roomId];
        if (game && game.gameState === 'lobby') {
            if (game.players.length >= game.maxPlayers) {
                return socket.emit('errorMessage', 'Oda dolu!');
            }
            const existingPlayers = game.players.map(p => ({ id: p.id }));
            game.players.push({ id: socket.id, name: playerName, avatar: avatar, score: 0 });
            socket.join(roomId);
            socket.emit('all users', existingPlayers);
            socket.emit('joinedRoom', roomId);
            io.to(roomId).emit('updateGameData', game);
        } else {
            socket.emit('errorMessage', 'Oda bulunamadı veya oyun zaten başlamış!');
        }
    });

    socket.on('startRound', (roomId) => {
        const game = games[roomId];
        const playerWhoStarted = game.players.find(p => p.id === socket.id);
        if (game && playerWhoStarted && game.players[0].id === socket.id && (game.gameState === 'lobby' || game.gameState === 'round_end')) {
            if (game.players.length < 3) return socket.emit('errorMessage', 'Oyunu başlatmak için en az 3 oyuncu gerekir!');
            game.gameState = 'playing';
            game.currentRound += 1;
            game.votes = {};
            const randomPair = celebrityPairs[Math.floor(Math.random() * celebrityPairs.length)];
            game.celebrityPair = randomPair;
            const shuffledPlayers = [...game.players].sort(() => 0.5 - Math.random());
            const minorityPlayer = shuffledPlayers[0];
            game.minorityPlayerId = minorityPlayer.id;
            shuffledPlayers.forEach(player => {
                const isMinority = player.id === minorityPlayer.id;
                io.to(player.id).emit('roundStarted', { celebrity: isMinority ? randomPair[1] : randomPair[0], round: game.currentRound });
            });
            io.to(roomId).emit('updateGameData', game);
        }
    });

    socket.on('playerVote', ({ roomId, votedPlayerId }) => {
        const game = games[roomId];
        if (!game || !game.votes || game.votes[socket.id]) return;
        game.votes[socket.id] = votedPlayerId;
        io.to(roomId).emit('updateGameData', game);
        if (Object.keys(game.votes).length === game.players.length) {
            calculateRoundResults(roomId);
        }
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('leaveRoom', ({ roomId }) => {
        socket.leave(roomId);
        handlePlayerLeave(socket.id, roomId);
    });

    socket.on('closeRoom', ({ roomId }) => {
        const game = games[roomId];
        if (game && game.players.length > 0 && game.players[0].id === socket.id) {
            socket.to(roomId).emit('roomClosed', 'Oda, sahip tarafından kapatıldı.');
            delete games[roomId];
        }
    });

    socket.on('disconnect', () => {
        let playerRoomId = null;
        for (const roomId in games) {
            if (games[roomId].players.some(p => p.id === socket.id)) {
                playerRoomId = roomId;
                break;
            }
        }
        if (playerRoomId) {
            handlePlayerLeave(socket.id, playerRoomId);
        }
    });
});

function calculateRoundResults(roomId) {
    const game = games[roomId];
    if (!game) return;
    const voteCounts = {};
    Object.values(game.votes).forEach(votedId => { voteCounts[votedId] = (voteCounts[votedId] || 0) + 1; });
    let mostVotedId = null; let maxVotes = 0;
    Object.entries(voteCounts).forEach(([userId, count]) => { if (count > maxVotes) { maxVotes = count; mostVotedId = userId; }});
    const playersWithMaxVotes = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);
    const minorityPlayer = game.players.find(p => p.id === game.minorityPlayerId);
    let roundResultData = {};
    if (playersWithMaxVotes.length !== 1) {
        if(minorityPlayer) minorityPlayer.score += 10;
        roundResultData = { roundWinner: 'minority', minorityPlayer, votedPlayer: null, celebrityPair: game.celebrityPair };
    } else {
        const votedPlayer = game.players.find(p => p.id === mostVotedId);
        if (mostVotedId === game.minorityPlayerId) {
            game.players.forEach(p => { if (p.id !== game.minorityPlayerId) p.score += 10; });
            roundResultData = { roundWinner: 'majority', minorityPlayer, votedPlayer, celebrityPair: game.celebrityPair };
        } else {
            if (minorityPlayer) minorityPlayer.score += 10;
            roundResultData = { roundWinner: 'minority', minorityPlayer, votedPlayer, celebrityPair: game.celebrityPair };
        }
    }
    game.gameState = 'round_end';
    io.to(roomId).emit('roundEnd', { ...roundResultData, round: game.currentRound });
    io.to(roomId).emit('updateGameData', game);
    if (game.players.some(p => p.score >= game.scoreToWin)) {
        const finalWinner = game.players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
        io.to(roomId).emit('gameOver', { winner: finalWinner });
        delete games[roomId];
    }
}

server.listen(PORT, () => { console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`); });