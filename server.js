const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

Elbette, anladım. Ünlü listesini gerçekten devasa bir hale getirelim ki oyunun tekrar oynanabilirliği maksimuma çıksın. Senin için tüm kategorileri, özellikle de müzik, futbol ve internet dünyasını daha da genişleterek yüzlerce çiftten oluşan yeni bir liste hazırladım.

Bu, muhtemelen ihtiyacın olacak en kalabalık liste. Tek yapman gereken aşağıdaki server.js kodunu projedeki dosyanla tamamen değiştirmek.

server.js Dosyasının Devasa Ünlü Listesiyle Final Hali
server.js dosyanın içindeki tüm metni sil ve aşağıdaki tam ve güncellenmiş kodun tamamını bu boş dosyaya yapıştır.

JavaScript

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

// --- DEVASA VE KATEGORİLERE AYRILMIŞ FİNAL ÜNLÜ LİSTESİ ---
const celebrityPairs = [
    // === MÜZİK DÜNYASI ===
    // Yeni Nesil & Gündemdeki Müzisyenler (Rap, Pop)
    ["Lvbel C5", "Çakal"],
    ["Uzi", "Reckol"],
    ["Sefo", "Murda"],
    ["Blok3", "Motive"],
    ["Heijan", "Muti"],
    ["Semincenk", "Can Koç"],
    ["Mero", "Ezhel"],
    ["Gazapizm", "Ceza"],
    ["Sagopa Kajmer", "Killa Hakan"],
    ["Norm Ender", "Ben Fero"],
    ["Güneş", "Lil Zey"],
    ["Mert Demir", "Mabel Matiz"],
    ["Köfn", "Madrigal"],
    ["Can Ozan", "Emir Can İğrek"],
    ["Irmak Arıcı", "Tuğçe Kandemir"],
    ["BEGE", "Batuflex"],
    ["Patron", "Şehinşah"],

    // Popüler Pop Müzik Sanatçıları
    ["Edis", "Buray"],
    ["Tarkan", "Murat Boz"],
    ["Mustafa Sandal", "Kenan Doğulu"],
    ["Serdar Ortaç", "Sinan Akçıl"],
    ["Yalın", "Gökhan Özen"],
    ["Oğuzhan Koç", "Murat Dalkılıç"],
    ["Aleyna Tilki", "Zeynep Bastık"],
    ["Gülşen", "Hande Yener"],
    ["Demet Akalın", "Bengü"],
    ["Sıla", "Göksel"],
    ["Melek Mosso", "Melike Şahin"],
    ["Simge Sağın", "Merve Özbey"],
    ["İrem Derici", "Aynur Aydın"],
    ["Hadise", "Ebru Yaşar"],
    ["Zerrin Özer", "Nükhet Duru"],

    // Arabesk ve Fantezi Müziğin Efsaneleri
    ["Müslüm Gürses", "Ferdi Tayfur"],
    ["İbrahim Tatlıses", "Orhan Gencebay"],
    ["Hakan Altun", "Serkan Kaya"],
    ["Ebru Gündeş", "Sibel Can"],
    ["Cengiz Kurtoğlu", "Ümit Besen"],
    ["Yıldız Tilbe", "Işın Karaca"],
    ["Mahsun Kırmızıgül", "Özcan Deniz"],
    ["Alişan", "Ceylan"],
    ["Neşet Ertaş", "Aşık Veysel"],
    
    // Rock ve Alternatif Müzik
    ["Teoman", "Haluk Levent"],
    ["Duman", "Mor ve Ötesi"], 
    ["Manga", "Athena"],
    ["Can Bonomo", "Hayko Cepkin"],
    ["Adamlar", "Büyük Ev Ablukada"],
    ["Yüzyüzeyken Konuşuruz", "Dolu Kadehi Ters Tut"],
    ["Erkin Koray", "Barış Akarsu"],
    ["Şebnem Ferah", "Özlem Tekin"],
    ["Pentagram", "Kurban"],
    
    // Müzik Dünyasının Duayenleri
    ["Sezen Aksu", "Sertab Erener"],
    ["Ajda Pekkan", "Nilüfer"],
    ["Barış Manço", "Cem Karaca"],
    ["MFÖ", "Yeni Türkü"],
    ["Kayahan", "Fikret Kızılok"],
    
    // === FUTBOL DÜNYASI ===
    // Güncel ve Popüler Futbolcular
    ["Arda Güler", "Can Uzun"],
    ["Hakan Çalhanoğlu", "Kerem Demirbay"],
    ["Kerem Aktürkoğlu", "Barış Alper Yılmaz"],
    ["İrfan Can Kahveci", "Yusuf Yazıcı"],
    ["Ferdi Kadıoğlu", "İsmail Yüksek"],
    ["Abdülkerim Bardakcı", "Kaan Ayhan"],
    ["Cenk Tosun", "Semih Kılıçsoy"],
    ["Cengiz Ünder", "Yunus Akgün"],
    ["Orkun Kökçü", "Salih Özcan"],
    ["Mert Hakan Yandaş", "Taylan Antalyalı"],
    ["Samet Akaydın", "Ozan Kabak"],

    // Süper Lig Popüler Yabancılar
    ["Fernando Muslera", "Uğurcan Çakır"],
    ["Mauro Icardi", "Edin Dzeko"],
    ["Dries Mertens", "Sebastian Szymanski"],
    ["Gedson Fernandes", "Fred"],
    ["Dusan Tadic", "Hakim Ziyech"],
    ["Altay Bayındır", "Dominik Livaković"],
    ["Vincent Aboubakar", "Michy Batshuayi"],
    ["Lucas Torreira", "Alexander Djiku"],

    // Efsane Futbolcular (Yerli)
    ["Sergen Yalçın", "Yusuf Şimşek"],
    ["Rüştü Reçber", "Volkan Demirel"],
    ["Hakan Şükür", "Burak Yılmaz"],
    ["Arda Turan", "Emre Belözoğlu"],
    ["Bülent Korkmaz", "Alpay Özalan"],
    ["Ümit Davala", "Hasan Şaş"],
    ["Tuncay Şanlı", "Nihat Kahveci"],
    ["İlhan Mansız", "Pascal Nouma"],
    ["Tugay Kerimoğlu", "Okan Buruk"],
    ["Metin Oktay", "Lefter Küçükandonyadis"],
    
    // Efsane Futbolcular (Yabancı)
    ["Alex de Souza", "Gheorghe Hagi"],
    ["Ricardo Quaresma", "Guti Hernández"],
    ["Didier Drogba", "Mario Jardel"],
    ["Roberto Carlos", "Gökhan Gönül"],
    ["Felipe Melo", "Selçuk İnan"],
    ["Atiba Hutchinson", "Josef de Souza"],
    ["Mario Gomez", "Demba Ba"],
    ["Pierre van Hooijdonk", "Dirk Kuyt"],
    ["Gheorghe Popescu", "Frank de Boer"],

    // Teknik Direktörler ve Yorumcular
    ["Fatih Terim", "Mustafa Denizli"],
    ["Sergen Yalçın", "Yılmaz Vural"],
    ["Okan Buruk", "Abdullah Avcı"],
    ["Vincenzo Montella", "Şenol Güneş"],
    ["Rıdvan Dilmen", "Erman Toroğlu"],
    ["Güntekin Onay", "Murat Kosova"],

    // === SİNEMA & DİZİ DÜNYASI ===
    // Popüler Oyuncular (Kadın)
    ["Hande Erçel", "Demet Özdemir"],
    ["Serenay Sarıkaya", "Fahriye Evcen"],
    ["Afra Saraçoğlu", "Sıla Türkoğlu"],
    ["Beren Saat", "Tuba Büyüküstün"],
    ["Hazal Kaya", "Alina Boz"],
    ["Pınar Deniz", "Cemre Baysel"],
    ["Burcu Biricik", "Aslı Enver"],
    ["Özge Özpirinçci", "Gupse Özay"],
    ["Elçin Sangu", "Melisa Şenolsun"],
    ["Ayça Ayşin Turan", "Özge Gürel"],
    ["Miray Daner", "Su Burcu Yazgı Coşkun"],
    ["Mine Tugay", "Gökçe Bahadır"],
    ["Eda Ece", "Şevval Sam"],
    ["Melis Sezen", "Büşra Develi"],
    ["Hafsanur Sancaktutan", "Deniz Baysal"],
    ["Birce Akalay", "Nur Fettahoğlu"],
    ["Evrim Alasya", "Ceren Karakoç"],
    ["Damla Sönmez", "Aslıhan Gürbüz"],
    ["Ezgi Mola", "Aylin Kontente"],
    ["Cansu Dere", "Tuba Ünsal"],

    // Popüler Oyuncular (Erkek)
    ["Kıvanç Tatlıtuğ", "Çağatay Ulusoy"],
    ["Kenan İmirzalıoğlu", "Burak Özçivit"],
    ["Mert Ramazan Demir", "Kubilay Aka"],
    ["Aras Bulut İynemli", "Can Yaman"],
    ["Engin Akyürek", "İlker Kaleli"],
    ["Barış Arduç", "Alp Navruz"],
    ["Salih Bademci", "Metin Akdülger"],
    ["Uraz Kaygılaroğlu", "Onur Tuna"],
    ["Kerem Bürsin", "Serkan Çayoğlu"],
    ["Çağlar Ertuğrul", "Deniz Can Aktaş"],
    ["Doğukan Güngör", "Barış Kılıç"],
    ["Kaan Urgancıoğlu", "Yiğit Özşener"],
    ["Buğra Gülsoy", "Serhat Teoman"],
    ["Ahmet Kural", "Murat Cemcir"],
     
    // Sunucular ve TV Yüzleri
    ["Beyazıt Öztürk", "Acun Ilıcalı"],
    ["Müge Anlı", "Esra Erol"],
    ["İbrahim Selim", "Kaan Sekban"],
    
    // Twitch Yayıncıları
    ["Jahrein (Ahmet Sonuç)", "Elraenn (Tuğkan Gönültaş)"],
    ["Pqueen (Pelin Baynazoğlu)", "Kendine Müzisyen (Kemal Can Parlak)"],
    ["wtcN (Ferit Karakaya)", "Mithrain (Cem Karakoç)"],
    ["Levo (Mustafa Keloğlu)", "Elwind (Kaan Atıcı)"],
    ["Zade (Furkan Civan)", "Hype (Gökay Eser)"],
    ["Anna Deniz", "Miafitz (Gözde Demiral)"],
    
    // YouTuber'lar
    ["Enes Batur", "Orkun Işıtmak"],
    ["Reynmen (Yusuf Aktaş)", "Berkcan Güven"],
    ["Kafalar (Atakan, Fatih, Bilal)", "Alper Rende"],
    ["Ali Biçim", "Mesut Can Tomay"],
    ["Deli Mi Ne? (Fester Abdü)", "Fırat Sobutay (OHA Diyorum)"],
    ["Meryem Can", "Başak Karahan"],
    ["Aykut Elmas", "Halil İbrahim Göker"],
    ["Barış Özcan", "Ruhi Çenet"],
    ["Evrim Ağacı (Çağrı Mert Bakırcı)", "Ayhan Tarakcı"],
    ["Videoyun (Can Sungur)", "Orhun Kayaalp"],
    
    // Instagram & TikTok Fenomenleri
    ["Danla Bilic", "Duygu Özaslan"],
    ["Cemre Solmaz", "Yaren Alaca"],
    ["Cellat36 (Özgür Deniz)", "Berke Juan"],
    ["Şeyma Subaşı", "Rachel Araz"],
    ["Uzun Makarna (Özkan Sağın)", "Sıla Dündar"
],

const games = {}; 

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

    socket.on("sending signal", payload => { io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID }); });
    socket.on("returning signal", payload => { io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id }); });
    socket.on('leaveRoom', ({ roomId }) => { socket.leave(roomId); handlePlayerLeave(socket.id, roomId); });

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
    Object.entries(voteCounts).forEach(([userId, count]) => { if (count > maxVotes) { maxVotes = count; mostVotedId = userId; } });
    const playersWithMaxVotes = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);
    const minorityPlayer = game.players.find(p => p.id === game.minorityPlayerId);
    let roundResultData = {};

    if (playersWithMaxVotes.length !== 1) {
        if (minorityPlayer) minorityPlayer.score += 10;
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

    const winner = game.players.find(p => p.score >= game.scoreToWin);
    if (winner) {
        const finalWinner = game.players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
        io.to(roomId).emit('gameOver', { winner: finalWinner });
        delete games[roomId];
    }
}

server.listen(PORT, () => { console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`); });