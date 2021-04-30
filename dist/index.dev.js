"use strict";

//module.exports = ffmpeg;
module.exports = require('./lib/ffmpeg'); //
//const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
//const isAntiLink = isGroup ? antilink.includes(from) : false
//
//

var _require = require('@adiwajshing/baileys'),
    WAConnection = _require.WAConnection,
    MessageType = _require.MessageType,
    Presence = _require.Presence,
    Mimetype = _require.Mimetype,
    GroupSettingChange = _require.GroupSettingChange;

var _require2 = require('./lib/color'),
    color = _require2.color,
    bgcolor = _require2.bgcolor;

var _require3 = require('./src/help'),
    help = _require3.help;

var _require4 = require('./lib/functions'),
    wait = _require4.wait,
    simih = _require4.simih,
    getBuffer = _require4.getBuffer,
    h2k = _require4.h2k,
    generateMessageID = _require4.generateMessageID,
    getGroupAdmins = _require4.getGroupAdmins,
    getRandom = _require4.getRandom,
    banner = _require4.banner,
    start = _require4.start,
    info = _require4.info,
    success = _require4.success,
    close = _require4.close;

var _require5 = require('./lib/fetcher'),
    fetchJson = _require5.fetchJson,
    fetchText = _require5.fetchText;

var _require6 = require('./lib/ocr'),
    recognize = _require6.recognize;

var fs = require('fs');

var moment = require('moment-timezone');

var _require7 = require('child_process'),
    exec = _require7.exec;

var fetch = require('node-fetch');

var tiktod = require('tiktok-scraper');

var ffmpeg = require('fluent-ffmpeg');

var _require8 = require('remove.bg'),
    removeBackgroundFromImageFile = _require8.removeBackgroundFromImageFile;

var lolis = require('lolis.life');

var loli = new lolis();
var welkom = JSON.parse(fs.readFileSync('./src/welkom.json'));
var nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'));
var samih = JSON.parse(fs.readFileSync('./src/simi.json'));
var setting = JSON.parse(fs.readFileSync('./src/settings.json'));
var vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:нσllσgяαм\n' // Nama
+ 'ORG:wa-bot;\n' // Nama bot
+ 'TEL;type=CELL;type=VOICE;waid=34747741456:+34 747 74 14 56\n' // Nomor bot
+ 'END:VCARD';
prefix = setting.prefix;
blocked = [];

function kyun(seconds) {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }

  var hours = Math.floor(seconds / (60 * 60));
  var minutes = Math.floor(seconds % (60 * 60) / 60);
  var seconds = Math.floor(seconds % 60); //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)

  return "".concat(pad(hours), " Jam ").concat(pad(minutes), " Menit ").concat(pad(seconds), " Detik");
}

function starts() {
  var client;
  return regeneratorRuntime.async(function starts$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          client = new WAConnection();
          client.logger.level = 'warn';
          console.log(banner.string);
          client.on('qr', function () {
            console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan the qr code above'));
          });
          fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json');
          client.on('connecting', function () {
            start('2', 'Connecting...');
          });
          client.on('open', function () {
            success('2', 'Connected');
          });
          _context7.next = 9;
          return regeneratorRuntime.awrap(client.connect({
            timeoutMs: 30 * 1000
          }));

        case 9:
          fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'));
          client.on('group-participants-update', function _callee(anu) {
            var mdata, _buff, _buff2;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (welkom.includes(anu.jid)) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return");

                  case 2:
                    _context.prev = 2;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(client.groupMetadata(anu.jid));

                  case 5:
                    mdata = _context.sent;
                    console.log(anu);

                    if (!(anu.action == 'add')) {
                      _context.next = 25;
                      break;
                    }

                    num = anu.participants[0];
                    _context.prev = 9;
                    _context.next = 12;
                    return regeneratorRuntime.awrap(client.getProfilePicture("".concat(anu.participants[0].split('@')[0], "@c.us")));

                  case 12:
                    ppimg = _context.sent;
                    _context.next = 18;
                    break;

                  case 15:
                    _context.prev = 15;
                    _context.t0 = _context["catch"](9);
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';

                  case 18:
                    teks = "Hola @".concat(num.split('@')[0], "\nBienvenid@ \n*").concat(mdata.subject, "*");
                    _context.next = 21;
                    return regeneratorRuntime.awrap(getBuffer(ppimg));

                  case 21:
                    _buff = _context.sent;
                    client.sendMessage(mdata.id, _buff, MessageType.image, {
                      caption: teks,
                      contextInfo: {
                        "mentionedJid": [num]
                      }
                    });
                    _context.next = 41;
                    break;

                  case 25:
                    if (!(anu.action == 'remove')) {
                      _context.next = 41;
                      break;
                    }

                    num = anu.participants[0];
                    _context.prev = 27;
                    _context.next = 30;
                    return regeneratorRuntime.awrap(client.getProfilePicture("".concat(num.split('@')[0], "@c.us")));

                  case 30:
                    ppimg = _context.sent;
                    _context.next = 36;
                    break;

                  case 33:
                    _context.prev = 33;
                    _context.t1 = _context["catch"](27);
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';

                  case 36:
                    teks = "Sayonara @".concat(num.split('@')[0], "\uD83D\uDC4B");
                    _context.next = 39;
                    return regeneratorRuntime.awrap(getBuffer(ppimg));

                  case 39:
                    _buff2 = _context.sent;
                    client.sendMessage(mdata.id, _buff2, MessageType.image, {
                      caption: teks,
                      contextInfo: {
                        "mentionedJid": [num]
                      }
                    });

                  case 41:
                    _context.next = 46;
                    break;

                  case 43:
                    _context.prev = 43;
                    _context.t2 = _context["catch"](2);
                    console.log('Error : %s', color(_context.t2, 'red'));

                  case 46:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[2, 43], [9, 15], [27, 33]]);
          });
          client.on('CB:Blocklist', function (json) {
            if (blocked.length > 2) return;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = json[1].blocklist[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;
                blocked.push(i.replace('c.us', 's.whatsapp.net'));
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          });
          client.on('chat-update', function _callee6(mek) {
            var addMetadata, content, from, type, apiKey, text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, time, command, args, isCmd, botNumber, ownerNumber, isGroup, sender, groupMetadata, groupName, groupId, groupMembers, groupAdmins, isBotGroupAdmins, isGroupAdmins, isWelkom, isNsfw, isSimi, isOwner, isUrl, reply, sendMess, mentions, isMedia, isQuotedImage, isQuotedVideo, isQuotedSticker, authorname, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, block, encmedia, _media, _encmedia, _media2, _encmedia2, _media3, _encmedia3, _media4, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, i, _ref, user, stats, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, mem, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _mem, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _mem2, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _mem3, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _, _encmedia4, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, _2, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _3, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _4, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _5, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _6, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, admon, _encmedia5;

            return regeneratorRuntime.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.prev = 0;

                    addMetadata = function addMetadata(packname, author) {
                      if (!packname) packname = 'WABot';
                      if (!author) author = 'Bot';
                      author = author.replace(/[^a-zA-Z0-9]/g, '');
                      var name = "".concat(author, "_").concat(packname);
                      if (fs.existsSync("./src/stickers/".concat(name, ".exif"))) return "./src/stickers/".concat(name, ".exif");
                      var json = {
                        "sticker-pack-name": packname,
                        "sticker-pack-publisher": author
                      };
                      var littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
                      var bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];
                      var len = JSON.stringify(json).length;
                      var last;

                      if (len > 256) {
                        len = len - 256;
                        bytes.unshift(0x01);
                      } else {
                        bytes.unshift(0x00);
                      }

                      if (len < 16) {
                        last = len.toString(16);
                        last = "0" + len;
                      } else {
                        last = len.toString(16);
                      }

                      var buf2 = Buffer.from(last, "hex");
                      var buf3 = Buffer.from(bytes);
                      var buf4 = Buffer.from(JSON.stringify(json));
                      var buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);
                      fs.writeFile("./src/stickers/".concat(name, ".exif"), buffer, function (err) {
                        return "./src/stickers/".concat(name, ".exif");
                      });
                    };

                    if (mek.hasNewMessage) {
                      _context6.next = 4;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 4:
                    mek = mek.messages.all()[0];

                    if (mek.message) {
                      _context6.next = 7;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 7:
                    if (!(mek.key && mek.key.remoteJid == 'status@broadcast')) {
                      _context6.next = 9;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 9:
                    if (!mek.key.fromMe) {
                      _context6.next = 11;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 11:
                    global.prefix;
                    global.blocked;
                    content = JSON.stringify(mek.message);
                    from = mek.key.remoteJid;
                    type = Object.keys(mek.message)[0];
                    apiKey = setting.apiKey; // contact me on whatsapp wa.me/6285892766102

                    text = MessageType.text, extendedText = MessageType.extendedText, contact = MessageType.contact, location = MessageType.location, liveLocation = MessageType.liveLocation, image = MessageType.image, video = MessageType.video, sticker = MessageType.sticker, document = MessageType.document, audio = MessageType.audio, product = MessageType.product;
                    time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss');
                    body = type === 'conversation' && mek.message.conversation.startsWith(prefix) ? mek.message.conversation : type == 'imageMessage' && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : type == 'videoMessage' && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : type == 'extendedTextMessage' && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : '';
                    budy = type === 'conversation' ? mek.message.conversation : type === 'extendedTextMessage' ? mek.message.extendedTextMessage.text : '';
                    command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
                    args = body.trim().split(/ +/).slice(1);
                    isCmd = body.startsWith(prefix);
                    mess = {
                      wait: '⌛ En proceso ⌛',
                      success: '✔️ Berhasil ✔️',
                      error: {
                        stick: '❌ Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
                        Iv: '❌ Link tidak valid ❌'
                      },
                      only: {
                        group: '❌ ¡Este comando solo se puede usar en grupos! ❌',
                        ownerG: '❌ ¡Este comando solo puede ser utilizado por el grupo propietario! ❌',
                        ownerB: '❌ ¡Este comando solo puede ser utilizado por el propietario del bot! ❌',
                        admin: '❌ ¡Este comando solo puede ser utilizado por administradores de grupo! ❌',
                        Badmin: '❌ ¡Este comando solo se puede usar cuando el bot es administrador! ❌'
                      }
                    };
                    botNumber = client.user.jid;
                    ownerNumber = ["34747741456@s.whatsapp.net"]; // replace this with your number

                    isGroup = from.endsWith('@g.us');
                    sender = isGroup ? mek.participant : mek.key.remoteJid;

                    if (!isGroup) {
                      _context6.next = 35;
                      break;
                    }

                    _context6.next = 32;
                    return regeneratorRuntime.awrap(client.groupMetadata(from));

                  case 32:
                    _context6.t0 = _context6.sent;
                    _context6.next = 36;
                    break;

                  case 35:
                    _context6.t0 = '';

                  case 36:
                    groupMetadata = _context6.t0;
                    groupName = isGroup ? groupMetadata.subject : '';
                    groupId = isGroup ? groupMetadata.jid : '';
                    groupMembers = isGroup ? groupMetadata.participants : '';
                    groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
                    isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
                    isGroupAdmins = groupAdmins.includes(sender) || false;
                    isWelkom = isGroup ? welkom.includes(from) : false;
                    isNsfw = isGroup ? nsfw.includes(from) : false;
                    isSimi = isGroup ? samih.includes(from) : false;
                    isOwner = ownerNumber.includes(sender);

                    isUrl = function isUrl(url) {
                      return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
                    };

                    reply = function reply(teks) {
                      client.sendMessage(from, teks, text, {
                        quoted: mek
                      });
                    };

                    sendMess = function sendMess(hehe, teks) {
                      client.sendMessage(hehe, teks, text);
                    };

                    mentions = function mentions(teks, memberr, id) {
                      id == null || id == undefined || id == false ? client.sendMessage(from, teks.trim(), extendedText, {
                        contextInfo: {
                          "mentionedJid": memberr
                        }
                      }) : client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                          "mentionedJid": memberr
                        }
                      });
                    };

                    colors = ['red', 'white', 'black', 'blue', 'yellow', 'green'];
                    isMedia = type === 'imageMessage' || type === 'videoMessage';
                    isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
                    isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
                    isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
                    if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length));
                    if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length));
                    if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length));
                    if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length));
                    authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined;

                    if (authorname != undefined) {} else {
                      authorname = groupName;
                    }

                    _context6.t1 = command;
                    _context6.next = _context6.t1 === 'help' ? 65 : _context6.t1 === 'reglas' ? 65 : _context6.t1 === 'menu' ? 65 : _context6.t1 === 'blocklist' ? 67 : _context6.t1 === 'ocr' ? 90 : _context6.t1 === 'tp' ? 102 : _context6.t1 === 'ep' ? 138 : _context6.t1 === 'tahta' ? 174 : _context6.t1 === 's' ? 197 : _context6.t1 === 'stiker' ? 197 : _context6.t1 === 'sticker' ? 197 : _context6.t1 === 'setprefix' ? 239 : _context6.t1 === 'yt2mp3' ? 248 : _context6.t1 === 'ytsearch' ? 267 : _context6.t1 === 'tiktok' ? 296 : _context6.t1 === 'tiktokstalk' ? 311 : _context6.t1 === 'nulis' ? 332 : _context6.t1 === 'tulis' ? 332 : _context6.t1 === 'url2img' ? 346 : _context6.t1 === 'tstiker' ? 366 : _context6.t1 === 'tsticker' ? 366 : _context6.t1 === 'edotensei' ? 378 : _context6.t1 === 'tagall' ? 405 : _context6.t1 === 'tagall2' ? 433 : _context6.t1 === 'tagall3' ? 457 : _context6.t1 === 'clearall' ? 481 : _context6.t1 === 'bc' ? 508 : _context6.t1 === 'promote' ? 563 : _context6.t1 === 'demote' ? 600 : _context6.t1 === 'add' ? 637 : _context6.t1 === 'ban' ? 649 : _context6.t1 === 'listadmins' ? 686 : _context6.t1 === 'enlace' ? 711 : _context6.t1 === 'welcome' ? 722 : _context6.t1 === 'dan' ? 740 : _context6.t1 === 'idols' ? 743 : _context6.t1 === 'gogogo' ? 746 : _context6.t1 === 'wait' ? 749 : _context6.t1 === 'creador' ? 761 : 763;
                    break;

                  case 65:
                    client.sendMessage(from, help(prefix), text);
                    return _context6.abrupt("break", 773);

                  case 67:
                    teks = 'This is list of blocked number :\n';
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context6.prev = 71;

                    for (_iterator2 = blocked[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      block = _step2.value;
                      teks += "~> @".concat(block.split('@')[0], "\n");
                    }

                    _context6.next = 79;
                    break;

                  case 75:
                    _context6.prev = 75;
                    _context6.t2 = _context6["catch"](71);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context6.t2;

                  case 79:
                    _context6.prev = 79;
                    _context6.prev = 80;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 82:
                    _context6.prev = 82;

                    if (!_didIteratorError2) {
                      _context6.next = 85;
                      break;
                    }

                    throw _iteratorError2;

                  case 85:
                    return _context6.finish(82);

                  case 86:
                    return _context6.finish(79);

                  case 87:
                    teks += "Total : ".concat(blocked.length);
                    client.sendMessage(from, teks.trim(), extendedText, {
                      quoted: mek,
                      contextInfo: {
                        "mentionedJid": blocked
                      }
                    });
                    return _context6.abrupt("break", 773);

                  case 90:
                    if (!((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0)) {
                      _context6.next = 100;
                      break;
                    }

                    encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek;
                    _context6.next = 94;
                    return regeneratorRuntime.awrap(client.downloadAndSaveMediaMessage(encmedia));

                  case 94:
                    _media = _context6.sent;
                    reply(mess.wait);
                    _context6.next = 98;
                    return regeneratorRuntime.awrap(recognize(_media, {
                      lang: 'eng+ind',
                      oem: 1,
                      psm: 3
                    }).then(function (teks) {
                      reply(teks.trim());
                      fs.unlinkSync(_media);
                    })["catch"](function (err) {
                      reply(err.message);
                      fs.unlinkSync(_media);
                    }));

                  case 98:
                    _context6.next = 101;
                    break;

                  case 100:
                    reply('Foto aja mas');

                  case 101:
                    return _context6.abrupt("break", 773);

                  case 102:
                    if (!(args.length < 1)) {
                      _context6.next = 106;
                      break;
                    }

                    return _context6.abrupt("return", reply('Pilih themenya om, 1 - 162'));

                  case 106:
                    if (!(args[0].toLowerCase() === 'list')) {
                      _context6.next = 114;
                      break;
                    }

                    _context6.next = 109;
                    return regeneratorRuntime.awrap(fetchText('https://mhankbarbar.moe/api/textpro/listtheme'));

                  case 109:
                    teks = _context6.sent;
                    teks = teks.replace(/<br>/g, '\n');
                    return _context6.abrupt("return", reply(teks));

                  case 114:
                    if (!(args.length < 2)) {
                      _context6.next = 116;
                      break;
                    }

                    return _context6.abrupt("return", reply('Teksnya juga dong om'));

                  case 116:
                    reply(mess.wait);
                    anu = "https://mhankbarbar.moe/api/textpro?pack=".concat(args[0], "&text=").concat(body.slice(3 + args[0].length + 1), "&apiKey=").concat(apiKey);
                    _context6.next = 120;
                    return regeneratorRuntime.awrap(fetch(anu));

                  case 120:
                    voss = _context6.sent;
                    ftype = require('file-type');
                    _context6.next = 124;
                    return regeneratorRuntime.awrap(ftype.fromStream(voss.body));

                  case 124:
                    vuss = _context6.sent;

                    if (!(vuss !== undefined)) {
                      _context6.next = 136;
                      break;
                    }

                    _context6.t3 = client;
                    _context6.t4 = from;
                    _context6.next = 130;
                    return regeneratorRuntime.awrap(getBuffer(anu));

                  case 130:
                    _context6.t5 = _context6.sent;
                    _context6.t6 = image;
                    _context6.t7 = {
                      caption: mess.success,
                      quoted: mek
                    };

                    _context6.t3.sendMessage.call(_context6.t3, _context6.t4, _context6.t5, _context6.t6, _context6.t7);

                    _context6.next = 137;
                    break;

                  case 136:
                    reply('Terjadi kesalahan, silahkan pilih theme lain');

                  case 137:
                    return _context6.abrupt("break", 773);

                  case 138:
                    if (!(args.length < 1)) {
                      _context6.next = 142;
                      break;
                    }

                    return _context6.abrupt("return", reply('Pilih themenya om, 1 - 216'));

                  case 142:
                    if (!(args[0].toLowerCase() === 'list')) {
                      _context6.next = 150;
                      break;
                    }

                    _context6.next = 145;
                    return regeneratorRuntime.awrap(fetchText('https://mhankbarbar.moe/api/ephoto/listtheme'));

                  case 145:
                    teks = _context6.sent;
                    teks = teks.replace(/<br>/g, '\n');
                    return _context6.abrupt("return", reply(teks));

                  case 150:
                    if (!(args.length < 2)) {
                      _context6.next = 152;
                      break;
                    }

                    return _context6.abrupt("return", reply('Teksnya juga dong om'));

                  case 152:
                    reply(mess.wait);
                    anu = "https://mhankbarbar.moe/api/ephoto?pack=".concat(args[0], "&text=").concat(body.slice(3 + args[0].length + 1), "&apiKey=").concat(apiKey);
                    _context6.next = 156;
                    return regeneratorRuntime.awrap(fetch(anu));

                  case 156:
                    voss = _context6.sent;
                    ftype = require('file-type');
                    _context6.next = 160;
                    return regeneratorRuntime.awrap(ftype.fromStream(voss.body));

                  case 160:
                    vuss = _context6.sent;

                    if (!(vuss !== undefined)) {
                      _context6.next = 172;
                      break;
                    }

                    _context6.t8 = client;
                    _context6.t9 = from;
                    _context6.next = 166;
                    return regeneratorRuntime.awrap(getBuffer(anu));

                  case 166:
                    _context6.t10 = _context6.sent;
                    _context6.t11 = image;
                    _context6.t12 = {
                      caption: mess.success,
                      quoted: mek
                    };

                    _context6.t8.sendMessage.call(_context6.t8, _context6.t9, _context6.t10, _context6.t11, _context6.t12);

                    _context6.next = 173;
                    break;

                  case 172:
                    reply('Terjadi kesalahan, silahkan pilih theme lain');

                  case 173:
                    return _context6.abrupt("break", 773);

                  case 174:
                    if (!(args.length < 1)) {
                      _context6.next = 176;
                      break;
                    }

                    return _context6.abrupt("return", reply('Teksnya om'));

                  case 176:
                    anu = "https://mhankbarbar.moe/api/htahta?text=".concat(args.join(' '), "&apiKey=").concat(apiKey);
                    _context6.next = 179;
                    return regeneratorRuntime.awrap(fetch(anu));

                  case 179:
                    voss = _context6.sent;
                    ftype = require('file-type');
                    _context6.next = 183;
                    return regeneratorRuntime.awrap(ftype.fromStream(voss.body));

                  case 183:
                    vuss = _context6.sent;

                    if (!(vuss !== undefined)) {
                      _context6.next = 195;
                      break;
                    }

                    _context6.t13 = client;
                    _context6.t14 = from;
                    _context6.next = 189;
                    return regeneratorRuntime.awrap(getBuffer(anu));

                  case 189:
                    _context6.t15 = _context6.sent;
                    _context6.t16 = image;
                    _context6.t17 = {
                      quoted: mek,
                      caption: mess.sucess
                    };

                    _context6.t13.sendMessage.call(_context6.t13, _context6.t14, _context6.t15, _context6.t16, _context6.t17);

                    _context6.next = 196;
                    break;

                  case 195:
                    reply('Terjadi kesalahan');

                  case 196:
                    return _context6.abrupt("break", 773);

                  case 197:
                    if (isGroup) {
                      _context6.next = 199;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 199:
                    if (isGroupAdmins) {
                      _context6.next = 201;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 201:
                    if (isBotGroupAdmins) {
                      _context6.next = 203;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.Badmin));

                  case 203:
                    if (!((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0)) {
                      _context6.next = 213;
                      break;
                    }

                    _encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek;
                    _context6.next = 207;
                    return regeneratorRuntime.awrap(client.downloadAndSaveMediaMessage(_encmedia));

                  case 207:
                    _media2 = _context6.sent;
                    ran = getRandom('.webp');
                    _context6.next = 211;
                    return regeneratorRuntime.awrap(ffmpeg("./".concat(_media2)).input(_media2).on('start', function (cmd) {
                      console.log("Started : ".concat(cmd));
                    }).on('error', function (err) {
                      console.log("Error : ".concat(err));
                      fs.unlinkSync(_media2);
                      reply(mess.error.stick);
                    }).on('end', function () {
                      console.log('Finish');
                      exec("webpmux -set exif ".concat(addMetadata('BOT', authorname), " ").concat(ran, " -o ").concat(ran), function _callee2(error) {
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                if (!error) {
                                  _context2.next = 2;
                                  break;
                                }

                                return _context2.abrupt("return", reply(mess.error.stick));

                              case 2:
                                client.sendMessage(from, fs.readFileSync(ran), sticker, {
                                  quoted: mek
                                });
                                fs.unlinkSync(_media2);
                                fs.unlinkSync(ran);

                              case 5:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      });
                    }).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(ran));

                  case 211:
                    _context6.next = 238;
                    break;

                  case 213:
                    if (!((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0)) {
                      _context6.next = 224;
                      break;
                    }

                    _encmedia2 = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek;
                    _context6.next = 217;
                    return regeneratorRuntime.awrap(client.downloadAndSaveMediaMessage(_encmedia2));

                  case 217:
                    _media3 = _context6.sent;
                    ran = getRandom('.webp');
                    reply(mess.wait);
                    _context6.next = 222;
                    return regeneratorRuntime.awrap(ffmpeg("./".concat(_media3)).inputFormat(_media3.split('.')[1]).on('start', function (cmd) {
                      console.log("Started : ".concat(cmd));
                    }).on('error', function (err) {
                      console.log("Error : ".concat(err));
                      fs.unlinkSync(_media3);
                      tipe = _media3.endsWith('.mp4') ? 'video' : 'gif';
                      reply("\u274C Gagal, pada saat mengkonversi ".concat(tipe, " ke stiker"));
                    }).on('end', function () {
                      console.log('Finish');
                      exec("webpmux -set exif ".concat(addMetadata('BOT', authorname), " ").concat(ran, " -o ").concat(ran), function _callee3(error) {
                        return regeneratorRuntime.async(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                if (!error) {
                                  _context3.next = 2;
                                  break;
                                }

                                return _context3.abrupt("return", reply(mess.error.stick));

                              case 2:
                                client.sendMessage(from, fs.readFileSync(ran), sticker, {
                                  quoted: mek
                                });
                                fs.unlinkSync(_media3);
                                fs.unlinkSync(ran);

                              case 5:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      });
                    }).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(ran));

                  case 222:
                    _context6.next = 238;
                    break;

                  case 224:
                    if (!((isMedia || isQuotedImage) && args[0] == 'nobg')) {
                      _context6.next = 237;
                      break;
                    }

                    _encmedia3 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek;
                    _context6.next = 228;
                    return regeneratorRuntime.awrap(client.downloadAndSaveMediaMessage(_encmedia3));

                  case 228:
                    _media4 = _context6.sent;
                    ranw = getRandom('.webp');
                    ranp = getRandom('.png');
                    reply(mess.wait);
                    keyrmbg = 'Your-ApiKey';
                    _context6.next = 235;
                    return regeneratorRuntime.awrap(removeBackgroundFromImageFile({
                      path: _media4,
                      apiKey: keyrmbg,
                      size: 'auto',
                      type: 'auto',
                      ranp: ranp
                    }).then(function (res) {
                      fs.unlinkSync(_media4);
                      var buffer = Buffer.from(res.base64img, 'base64');
                      fs.writeFileSync(ranp, buffer, function (err) {
                        if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.');
                      });
                      exec("ffmpeg -i ".concat(ranp, " -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ").concat(ranw), function (err) {
                        fs.unlinkSync(ranp);
                        if (err) return reply(mess.error.stick);
                        exec("webpmux -set exif ".concat(addMetadata('BOT', authorname), " ").concat(ranw, " -o ").concat(ranw), function _callee4(error) {
                          return regeneratorRuntime.async(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  if (!error) {
                                    _context4.next = 2;
                                    break;
                                  }

                                  return _context4.abrupt("return", reply(mess.error.stick));

                                case 2:
                                  client.sendMessage(from, fs.readFileSync(ranw), sticker, {
                                    quoted: mek
                                  });
                                  fs.unlinkSync(ranw);

                                case 4:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          });
                        });
                      });
                    }));

                  case 235:
                    _context6.next = 238;
                    break;

                  case 237:
                    reply("Kirim gambar dengan caption ".concat(prefix, "sticker atau tag gambar yang sudah dikirim"));

                  case 238:
                    return _context6.abrupt("break", 773);

                  case 239:
                    if (!(args.length < 1)) {
                      _context6.next = 241;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 241:
                    if (isOwner) {
                      _context6.next = 243;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.ownerB));

                  case 243:
                    prefix = args[0];
                    setting.prefix = prefix;
                    fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'));
                    reply("Prefix berhasil di ubah menjadi : ".concat(prefix));
                    return _context6.abrupt("break", 773);

                  case 248:
                    if (!(args.length < 1)) {
                      _context6.next = 250;
                      break;
                    }

                    return _context6.abrupt("return", reply('Urlnya mana um?'));

                  case 250:
                    if (!(!isUrl(args[0]) && !args[0].includes('youtu'))) {
                      _context6.next = 252;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.error.Iv));

                  case 252:
                    _context6.next = 254;
                    return regeneratorRuntime.awrap(fetchJson("https://mhankbarbar.moe/api/yta?url=".concat(args[0], "&apiKey=").concat(apiKey), {
                      method: 'get'
                    }));

                  case 254:
                    anu = _context6.sent;

                    if (!anu.error) {
                      _context6.next = 257;
                      break;
                    }

                    return _context6.abrupt("return", reply(anu.error));

                  case 257:
                    teks = "*Title* : ".concat(anu.title, "\n*Filesize* : ").concat(anu.filesize);
                    _context6.next = 260;
                    return regeneratorRuntime.awrap(getBuffer(anu.thumb));

                  case 260:
                    thumb = _context6.sent;
                    client.sendMessage(from, thumb, image, {
                      quoted: mek,
                      caption: teks
                    });
                    _context6.next = 264;
                    return regeneratorRuntime.awrap(getBuffer(anu.result));

                  case 264:
                    buffer = _context6.sent;
                    client.sendMessage(from, buffer, audio, {
                      mimetype: 'audio/mp4',
                      filename: "".concat(anu.title, ".mp3"),
                      quoted: mek
                    });
                    return _context6.abrupt("break", 773);

                  case 267:
                    if (!(args.length < 1)) {
                      _context6.next = 269;
                      break;
                    }

                    return _context6.abrupt("return", reply('Yang mau di cari apaan? titit?'));

                  case 269:
                    _context6.next = 271;
                    return regeneratorRuntime.awrap(fetchJson("https://mhankbarbar.moe/api/ytsearch?q=".concat(body.slice(10), "&apiKey=").concat(apiKey), {
                      method: 'get'
                    }));

                  case 271:
                    anu = _context6.sent;

                    if (!anu.error) {
                      _context6.next = 274;
                      break;
                    }

                    return _context6.abrupt("return", reply(anu.error));

                  case 274:
                    teks = '=================\n';
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context6.prev = 278;

                    for (_iterator3 = anu.result[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      i = _step3.value;
                      teks += "*Title* : ".concat(i.title, "\n*Id* : ").concat(i.id, "\n*Published* : ").concat(i.publishTime, "\n*Duration* : ").concat(i.duration, "\n*Views* : ").concat(h2k(i.views), "\n=================\n");
                    }

                    _context6.next = 286;
                    break;

                  case 282:
                    _context6.prev = 282;
                    _context6.t18 = _context6["catch"](278);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context6.t18;

                  case 286:
                    _context6.prev = 286;
                    _context6.prev = 287;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                      _iterator3["return"]();
                    }

                  case 289:
                    _context6.prev = 289;

                    if (!_didIteratorError3) {
                      _context6.next = 292;
                      break;
                    }

                    throw _iteratorError3;

                  case 292:
                    return _context6.finish(289);

                  case 293:
                    return _context6.finish(286);

                  case 294:
                    reply(teks.trim());
                    return _context6.abrupt("break", 773);

                  case 296:
                    if (!(args.length < 1)) {
                      _context6.next = 298;
                      break;
                    }

                    return _context6.abrupt("return", reply('Urlnya mana um?'));

                  case 298:
                    if (!(!isUrl(args[0]) && !args[0].includes('tiktok.com'))) {
                      _context6.next = 300;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.error.Iv));

                  case 300:
                    reply(mess.wait);
                    _context6.next = 303;
                    return regeneratorRuntime.awrap(fetchJson("https://mhankbarbar.moe/api/tiktok?url=".concat(args[0], "&apiKey=").concat(apiKey), {
                      method: 'get'
                    }));

                  case 303:
                    anu = _context6.sent;

                    if (!anu.error) {
                      _context6.next = 306;
                      break;
                    }

                    return _context6.abrupt("return", reply(anu.error));

                  case 306:
                    _context6.next = 308;
                    return regeneratorRuntime.awrap(getBuffer(anu.result));

                  case 308:
                    buffer = _context6.sent;
                    client.sendMessage(from, buffer, video, {
                      quoted: mek
                    });
                    return _context6.abrupt("break", 773);

                  case 311:
                    _context6.prev = 311;

                    if (!(args.length < 1)) {
                      _context6.next = 314;
                      break;
                    }

                    return _context6.abrupt("return", client.sendMessage(from, 'Usernamenya mana um?', text, {
                      quoted: mek
                    }));

                  case 314:
                    _context6.next = 316;
                    return regeneratorRuntime.awrap(tiktod.getUserProfileInfo(args[0]));

                  case 316:
                    _ref = _context6.sent;
                    user = _ref.user;
                    stats = _ref.stats;
                    reply(mess.wait);
                    teks = "*ID* : ".concat(user.id, "\n*Username* : ").concat(user.uniqueId, "\n*Nickname* : ").concat(user.nickname, "\n*Followers* : ").concat(stats.followerCount, "\n*Followings* : ").concat(stats.followingCount, "\n*Posts* : ").concat(stats.videoCount, "\n*Luv* : ").concat(stats.heart, "\n");
                    _context6.next = 323;
                    return regeneratorRuntime.awrap(getBuffer(user.avatarLarger));

                  case 323:
                    buffer = _context6.sent;
                    client.sendMessage(from, buffer, image, {
                      quoted: mek,
                      caption: teks
                    });
                    _context6.next = 331;
                    break;

                  case 327:
                    _context6.prev = 327;
                    _context6.t19 = _context6["catch"](311);
                    console.log("Error :", color(_context6.t19, 'red'));
                    reply('Kemungkinan username tidak valid');

                  case 331:
                    return _context6.abrupt("break", 773);

                  case 332:
                    if (!(args.length < 1)) {
                      _context6.next = 334;
                      break;
                    }

                    return _context6.abrupt("return", reply('Yang mau di tulis apaan?'));

                  case 334:
                    teks = body.slice(7);
                    reply(mess.wait);
                    _context6.next = 338;
                    return regeneratorRuntime.awrap(fetchJson("https://mhankbarbar.moe/nulis?text=".concat(teks, "&apiKey=").concat(apiKey), {
                      method: 'get'
                    }));

                  case 338:
                    anu = _context6.sent;

                    if (!anu.error) {
                      _context6.next = 341;
                      break;
                    }

                    return _context6.abrupt("return", reply(anu.error));

                  case 341:
                    _context6.next = 343;
                    return regeneratorRuntime.awrap(getBuffer(anu.result));

                  case 343:
                    buff = _context6.sent;
                    client.sendMessage(from, buff, image, {
                      quoted: mek,
                      caption: mess.success
                    });
                    return _context6.abrupt("break", 773);

                  case 346:
                    tipelist = ['desktop', 'tablet', 'mobile'];

                    if (!(args.length < 1)) {
                      _context6.next = 349;
                      break;
                    }

                    return _context6.abrupt("return", reply('Tipenya apa um?'));

                  case 349:
                    if (tipelist.includes(args[0])) {
                      _context6.next = 351;
                      break;
                    }

                    return _context6.abrupt("return", reply('Tipe desktop|tablet|mobile'));

                  case 351:
                    if (!(args.length < 2)) {
                      _context6.next = 353;
                      break;
                    }

                    return _context6.abrupt("return", reply('Urlnya mana um?'));

                  case 353:
                    if (isUrl(args[1])) {
                      _context6.next = 355;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.error.Iv));

                  case 355:
                    reply(mess.wait);
                    _context6.next = 358;
                    return regeneratorRuntime.awrap(fetchJson("https://mhankbarbar.moe/api/url2image?tipe=".concat(args[0], "&url=").concat(args[1], "&apiKey=").concat(apiKey), {
                      method: 'get'
                    }));

                  case 358:
                    anu = _context6.sent;

                    if (!anu.error) {
                      _context6.next = 361;
                      break;
                    }

                    return _context6.abrupt("return", reply(anu.error));

                  case 361:
                    _context6.next = 363;
                    return regeneratorRuntime.awrap(getBuffer(anu.result));

                  case 363:
                    buff = _context6.sent;
                    client.sendMessage(from, buff, image, {
                      quoted: mek
                    });
                    return _context6.abrupt("break", 773);

                  case 366:
                    if (!(args.length < 1)) {
                      _context6.next = 368;
                      break;
                    }

                    return _context6.abrupt("return", reply('Textnya mana um?'));

                  case 368:
                    ranp = getRandom('.png');
                    rano = getRandom('.webp');
                    teks = body.slice(9).trim();
                    _context6.next = 373;
                    return regeneratorRuntime.awrap(fetchJson("https://mhankbarbar.moe/api/text2image?text=".concat(teks, "&apiKey=").concat(apiKey), {
                      method: 'get'
                    }));

                  case 373:
                    anu = _context6.sent;

                    if (!anu.error) {
                      _context6.next = 376;
                      break;
                    }

                    return _context6.abrupt("return", reply(anu.error));

                  case 376:
                    exec("wget ".concat(anu.result, " -O ").concat(ranp, " && ffmpeg -i ").concat(ranp, " -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ").concat(rano), function (err) {
                      fs.unlinkSync(ranp);
                      if (err) return reply(mess.error.stick);
                      exec("webpmux -set exif ".concat(addMetadata('BOT', authorname), " ").concat(rano, " -o ").concat(rano), function _callee5(error) {
                        return regeneratorRuntime.async(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                if (!error) {
                                  _context5.next = 2;
                                  break;
                                }

                                return _context5.abrupt("return", reply(mess.error.stick));

                              case 2:
                                client.sendMessage(from, fs.readFileSync(rano), sticker, {
                                  quoted: mek
                                });
                                fs.unlinkSync(rano);

                              case 4:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        });
                      });
                      /*client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
                      fs.unlinkSync(rano)*/
                    });
                    return _context6.abrupt("break", 773);

                  case 378:
                    if (isGroup) {
                      _context6.next = 380;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 380:
                    if (isOwner) {
                      _context6.next = 382;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.ownerB));

                  case 382:
                    members_id = [];
                    teks = args.length > 1 ? body.slice(8).trim() : '';
                    teks += '\n\n';
                    _iteratorNormalCompletion4 = true;
                    _didIteratorError4 = false;
                    _iteratorError4 = undefined;
                    _context6.prev = 388;

                    for (_iterator4 = groupMembers[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      mem = _step4.value;
                      teks += "*#* @".concat(mem.jid.split('@')[0], "\n");
                      members_id.push(mem.jid);
                    }

                    _context6.next = 396;
                    break;

                  case 392:
                    _context6.prev = 392;
                    _context6.t20 = _context6["catch"](388);
                    _didIteratorError4 = true;
                    _iteratorError4 = _context6.t20;

                  case 396:
                    _context6.prev = 396;
                    _context6.prev = 397;

                    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                      _iterator4["return"]();
                    }

                  case 399:
                    _context6.prev = 399;

                    if (!_didIteratorError4) {
                      _context6.next = 402;
                      break;
                    }

                    throw _iteratorError4;

                  case 402:
                    return _context6.finish(399);

                  case 403:
                    return _context6.finish(396);

                  case 404:
                    return _context6.abrupt("break", 773);

                  case 405:
                    if (isGroup) {
                      _context6.next = 407;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 407:
                    if (isGroupAdmins) {
                      _context6.next = 409;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 409:
                    members_id = [];
                    teks = args.length > 1 ? body.slice(8).trim() : '';
                    teks += '\n\n';
                    _iteratorNormalCompletion5 = true;
                    _didIteratorError5 = false;
                    _iteratorError5 = undefined;
                    _context6.prev = 415;

                    for (_iterator5 = groupMembers[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                      _mem = _step5.value;
                      teks += "*#* @".concat(_mem.jid.split('@')[0], "\n");
                      members_id.push(_mem.jid);
                    }

                    _context6.next = 423;
                    break;

                  case 419:
                    _context6.prev = 419;
                    _context6.t21 = _context6["catch"](415);
                    _didIteratorError5 = true;
                    _iteratorError5 = _context6.t21;

                  case 423:
                    _context6.prev = 423;
                    _context6.prev = 424;

                    if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                      _iterator5["return"]();
                    }

                  case 426:
                    _context6.prev = 426;

                    if (!_didIteratorError5) {
                      _context6.next = 429;
                      break;
                    }

                    throw _iteratorError5;

                  case 429:
                    return _context6.finish(426);

                  case 430:
                    return _context6.finish(423);

                  case 431:
                    mentions(teks, members_id, true);
                    return _context6.abrupt("break", 773);

                  case 433:
                    members_id = [];
                    teks = args.length > 1 ? body.slice(8).trim() : '';
                    teks += '\n\n';
                    _iteratorNormalCompletion6 = true;
                    _didIteratorError6 = false;
                    _iteratorError6 = undefined;
                    _context6.prev = 439;

                    for (_iterator6 = groupMembers[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                      _mem2 = _step6.value;
                      teks += "\u2560\u27A5 @".concat(_mem2.jid.split('@')[0], "\n");
                      members_id.push(_mem2.jid);
                    }

                    _context6.next = 447;
                    break;

                  case 443:
                    _context6.prev = 443;
                    _context6.t22 = _context6["catch"](439);
                    _didIteratorError6 = true;
                    _iteratorError6 = _context6.t22;

                  case 447:
                    _context6.prev = 447;
                    _context6.prev = 448;

                    if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                      _iterator6["return"]();
                    }

                  case 450:
                    _context6.prev = 450;

                    if (!_didIteratorError6) {
                      _context6.next = 453;
                      break;
                    }

                    throw _iteratorError6;

                  case 453:
                    return _context6.finish(450);

                  case 454:
                    return _context6.finish(447);

                  case 455:
                    reply(teks);
                    return _context6.abrupt("break", 773);

                  case 457:
                    members_id = [];
                    teks = args.length > 1 ? body.slice(8).trim() : '';
                    teks += '\n\n';
                    _iteratorNormalCompletion7 = true;
                    _didIteratorError7 = false;
                    _iteratorError7 = undefined;
                    _context6.prev = 463;

                    for (_iterator7 = groupMembers[Symbol.iterator](); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                      _mem3 = _step7.value;
                      teks += "\u2560\u27A5 https://wa.me/".concat(_mem3.jid.split('@')[0], "\n");
                      members_id.push(_mem3.jid);
                    }

                    _context6.next = 471;
                    break;

                  case 467:
                    _context6.prev = 467;
                    _context6.t23 = _context6["catch"](463);
                    _didIteratorError7 = true;
                    _iteratorError7 = _context6.t23;

                  case 471:
                    _context6.prev = 471;
                    _context6.prev = 472;

                    if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                      _iterator7["return"]();
                    }

                  case 474:
                    _context6.prev = 474;

                    if (!_didIteratorError7) {
                      _context6.next = 477;
                      break;
                    }

                    throw _iteratorError7;

                  case 477:
                    return _context6.finish(474);

                  case 478:
                    return _context6.finish(471);

                  case 479:
                    client.sendMessage(from, teks, text, {
                      detectLinks: false,
                      quoted: mek
                    });
                    return _context6.abrupt("break", 773);

                  case 481:
                    if (isOwner) {
                      _context6.next = 483;
                      break;
                    }

                    return _context6.abrupt("return", reply('Kamu siapa?'));

                  case 483:
                    _context6.next = 485;
                    return regeneratorRuntime.awrap(client.chats.all());

                  case 485:
                    anu = _context6.sent;
                    client.setMaxListeners(25);
                    _iteratorNormalCompletion8 = true;
                    _didIteratorError8 = false;
                    _iteratorError8 = undefined;
                    _context6.prev = 490;

                    for (_iterator8 = anu[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                      _ = _step8.value;
                      client.deleteChat(_.jid);
                    }

                    _context6.next = 498;
                    break;

                  case 494:
                    _context6.prev = 494;
                    _context6.t24 = _context6["catch"](490);
                    _didIteratorError8 = true;
                    _iteratorError8 = _context6.t24;

                  case 498:
                    _context6.prev = 498;
                    _context6.prev = 499;

                    if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                      _iterator8["return"]();
                    }

                  case 501:
                    _context6.prev = 501;

                    if (!_didIteratorError8) {
                      _context6.next = 504;
                      break;
                    }

                    throw _iteratorError8;

                  case 504:
                    return _context6.finish(501);

                  case 505:
                    return _context6.finish(498);

                  case 506:
                    reply('Sukses delete all chat :)');
                    return _context6.abrupt("break", 773);

                  case 508:
                    if (isOwner) {
                      _context6.next = 510;
                      break;
                    }

                    return _context6.abrupt("return", reply('Kamu siapa?'));

                  case 510:
                    if (!(args.length < 1)) {
                      _context6.next = 512;
                      break;
                    }

                    return _context6.abrupt("return", reply('.......'));

                  case 512:
                    _context6.next = 514;
                    return regeneratorRuntime.awrap(client.chats.all());

                  case 514:
                    anu = _context6.sent;

                    if (!(isMedia && !mek.message.videoMessage || isQuotedImage)) {
                      _context6.next = 542;
                      break;
                    }

                    _encmedia4 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek;
                    _context6.next = 519;
                    return regeneratorRuntime.awrap(client.downloadMediaMessage(_encmedia4));

                  case 519:
                    buff = _context6.sent;
                    _iteratorNormalCompletion9 = true;
                    _didIteratorError9 = false;
                    _iteratorError9 = undefined;
                    _context6.prev = 523;

                    for (_iterator9 = anu[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                      _2 = _step9.value;
                      client.sendMessage(_2.jid, buff, image, {
                        caption: "[ Ini Broadcast ]\n\n".concat(body.slice(4))
                      });
                    }

                    _context6.next = 531;
                    break;

                  case 527:
                    _context6.prev = 527;
                    _context6.t25 = _context6["catch"](523);
                    _didIteratorError9 = true;
                    _iteratorError9 = _context6.t25;

                  case 531:
                    _context6.prev = 531;
                    _context6.prev = 532;

                    if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                      _iterator9["return"]();
                    }

                  case 534:
                    _context6.prev = 534;

                    if (!_didIteratorError9) {
                      _context6.next = 537;
                      break;
                    }

                    throw _iteratorError9;

                  case 537:
                    return _context6.finish(534);

                  case 538:
                    return _context6.finish(531);

                  case 539:
                    reply('Suksess broadcast');
                    _context6.next = 562;
                    break;

                  case 542:
                    _iteratorNormalCompletion10 = true;
                    _didIteratorError10 = false;
                    _iteratorError10 = undefined;
                    _context6.prev = 545;

                    for (_iterator10 = anu[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                      _3 = _step10.value;
                      sendMess(_3.jid, "[ Ini Broadcast ]\n\n".concat(body.slice(4)));
                    }

                    _context6.next = 553;
                    break;

                  case 549:
                    _context6.prev = 549;
                    _context6.t26 = _context6["catch"](545);
                    _didIteratorError10 = true;
                    _iteratorError10 = _context6.t26;

                  case 553:
                    _context6.prev = 553;
                    _context6.prev = 554;

                    if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                      _iterator10["return"]();
                    }

                  case 556:
                    _context6.prev = 556;

                    if (!_didIteratorError10) {
                      _context6.next = 559;
                      break;
                    }

                    throw _iteratorError10;

                  case 559:
                    return _context6.finish(556);

                  case 560:
                    return _context6.finish(553);

                  case 561:
                    reply('Suksess broadcast');

                  case 562:
                    return _context6.abrupt("break", 773);

                  case 563:
                    if (isGroup) {
                      _context6.next = 565;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 565:
                    if (isGroupAdmins) {
                      _context6.next = 567;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 567:
                    if (isBotGroupAdmins) {
                      _context6.next = 569;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.Badmin));

                  case 569:
                    if (!(mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null)) {
                      _context6.next = 571;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 571:
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;

                    if (!(mentioned.length > 1)) {
                      _context6.next = 597;
                      break;
                    }

                    teks = 'Berhasil Promote\n';
                    _iteratorNormalCompletion11 = true;
                    _didIteratorError11 = false;
                    _iteratorError11 = undefined;
                    _context6.prev = 577;

                    for (_iterator11 = mentioned[Symbol.iterator](); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                      _4 = _step11.value;
                      teks += "@".concat(_4.split('@')[0], "\n");
                    }

                    _context6.next = 585;
                    break;

                  case 581:
                    _context6.prev = 581;
                    _context6.t27 = _context6["catch"](577);
                    _didIteratorError11 = true;
                    _iteratorError11 = _context6.t27;

                  case 585:
                    _context6.prev = 585;
                    _context6.prev = 586;

                    if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                      _iterator11["return"]();
                    }

                  case 588:
                    _context6.prev = 588;

                    if (!_didIteratorError11) {
                      _context6.next = 591;
                      break;
                    }

                    throw _iteratorError11;

                  case 591:
                    return _context6.finish(588);

                  case 592:
                    return _context6.finish(585);

                  case 593:
                    mentions(from, mentioned, true);
                    client.groupRemove(from, mentioned);
                    _context6.next = 599;
                    break;

                  case 597:
                    mentions("Berhasil Promote @".concat(mentioned[0].split('@')[0], " Sebagai Admin Group!"), mentioned, true);
                    client.groupMakeAdmin(from, mentioned);

                  case 599:
                    return _context6.abrupt("break", 773);

                  case 600:
                    if (isGroup) {
                      _context6.next = 602;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 602:
                    if (isGroupAdmins) {
                      _context6.next = 604;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 604:
                    if (isBotGroupAdmins) {
                      _context6.next = 606;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.Badmin));

                  case 606:
                    if (!(mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null)) {
                      _context6.next = 608;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 608:
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;

                    if (!(mentioned.length > 1)) {
                      _context6.next = 634;
                      break;
                    }

                    teks = 'Berhasil Demote\n';
                    _iteratorNormalCompletion12 = true;
                    _didIteratorError12 = false;
                    _iteratorError12 = undefined;
                    _context6.prev = 614;

                    for (_iterator12 = mentioned[Symbol.iterator](); !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                      _5 = _step12.value;
                      teks += "@".concat(_5.split('@')[0], "\n");
                    }

                    _context6.next = 622;
                    break;

                  case 618:
                    _context6.prev = 618;
                    _context6.t28 = _context6["catch"](614);
                    _didIteratorError12 = true;
                    _iteratorError12 = _context6.t28;

                  case 622:
                    _context6.prev = 622;
                    _context6.prev = 623;

                    if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                      _iterator12["return"]();
                    }

                  case 625:
                    _context6.prev = 625;

                    if (!_didIteratorError12) {
                      _context6.next = 628;
                      break;
                    }

                    throw _iteratorError12;

                  case 628:
                    return _context6.finish(625);

                  case 629:
                    return _context6.finish(622);

                  case 630:
                    mentions(teks, mentioned, true);
                    client.groupRemove(from, mentioned);
                    _context6.next = 636;
                    break;

                  case 634:
                    mentions("Berhasil Demote @".concat(mentioned[0].split('@')[0], " Menjadi Member Group!"), mentioned, true);
                    client.groupDemoteAdmin(from, mentioned);

                  case 636:
                    return _context6.abrupt("break", 773);

                  case 637:
                    if (isGroup) {
                      _context6.next = 639;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 639:
                    if (isGroupAdmins) {
                      _context6.next = 641;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 641:
                    if (isBotGroupAdmins) {
                      _context6.next = 643;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.Badmin));

                  case 643:
                    if (!(args.length < 1)) {
                      _context6.next = 645;
                      break;
                    }

                    return _context6.abrupt("return", reply('Yang mau di add jin ya?'));

                  case 645:
                    if (!args[0].startsWith('08')) {
                      _context6.next = 647;
                      break;
                    }

                    return _context6.abrupt("return", reply('Gunakan kode negara mas'));

                  case 647:
                    try {
                      num = "".concat(args[0].replace(/ /g, ''), "@s.whatsapp.net");
                      client.groupAdd(from, [num]);
                    } catch (e) {
                      console.log('Error :', e);
                      reply('Gagal menambahkan target, mungkin karena di private');
                    }

                    return _context6.abrupt("break", 773);

                  case 649:
                    if (isGroup) {
                      _context6.next = 651;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 651:
                    if (isGroupAdmins) {
                      _context6.next = 653;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 653:
                    if (isBotGroupAdmins) {
                      _context6.next = 655;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.Badmin));

                  case 655:
                    if (!(mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null)) {
                      _context6.next = 657;
                      break;
                    }

                    return _context6.abrupt("return", reply('Tag target yang ingin di tendang!'));

                  case 657:
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;

                    if (!(mentioned.length > 1)) {
                      _context6.next = 683;
                      break;
                    }

                    teks = 'Perintah di terima, mengeluarkan :\n';
                    _iteratorNormalCompletion13 = true;
                    _didIteratorError13 = false;
                    _iteratorError13 = undefined;
                    _context6.prev = 663;

                    for (_iterator13 = mentioned[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                      _6 = _step13.value;
                      teks += "@".concat(_6.split('@')[0], "\n");
                    }

                    _context6.next = 671;
                    break;

                  case 667:
                    _context6.prev = 667;
                    _context6.t29 = _context6["catch"](663);
                    _didIteratorError13 = true;
                    _iteratorError13 = _context6.t29;

                  case 671:
                    _context6.prev = 671;
                    _context6.prev = 672;

                    if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                      _iterator13["return"]();
                    }

                  case 674:
                    _context6.prev = 674;

                    if (!_didIteratorError13) {
                      _context6.next = 677;
                      break;
                    }

                    throw _iteratorError13;

                  case 677:
                    return _context6.finish(674);

                  case 678:
                    return _context6.finish(671);

                  case 679:
                    mentions(teks, mentioned, true);
                    client.groupRemove(from, mentioned);
                    _context6.next = 685;
                    break;

                  case 683:
                    mentions("Perintah di terima, mengeluarkan : @".concat(mentioned[0].split('@')[0]), mentioned, true);
                    client.groupRemove(from, mentioned);

                  case 685:
                    return _context6.abrupt("break", 773);

                  case 686:
                    if (isGroup) {
                      _context6.next = 688;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 688:
                    teks = "List admin of group *".concat(groupMetadata.subject, "*\nTotal : ").concat(groupAdmins.length, "\n\n");
                    no = 0;
                    _iteratorNormalCompletion14 = true;
                    _didIteratorError14 = false;
                    _iteratorError14 = undefined;
                    _context6.prev = 693;

                    for (_iterator14 = groupAdmins[Symbol.iterator](); !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                      admon = _step14.value;
                      no += 1;
                      teks += "[".concat(no.toString(), "] @").concat(admon.split('@')[0], "\n");
                    }

                    _context6.next = 701;
                    break;

                  case 697:
                    _context6.prev = 697;
                    _context6.t30 = _context6["catch"](693);
                    _didIteratorError14 = true;
                    _iteratorError14 = _context6.t30;

                  case 701:
                    _context6.prev = 701;
                    _context6.prev = 702;

                    if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                      _iterator14["return"]();
                    }

                  case 704:
                    _context6.prev = 704;

                    if (!_didIteratorError14) {
                      _context6.next = 707;
                      break;
                    }

                    throw _iteratorError14;

                  case 707:
                    return _context6.finish(704);

                  case 708:
                    return _context6.finish(701);

                  case 709:
                    mentions(teks, groupAdmins, true);
                    return _context6.abrupt("break", 773);

                  case 711:
                    if (isGroup) {
                      _context6.next = 713;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 713:
                    if (isGroupAdmins) {
                      _context6.next = 715;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 715:
                    if (isBotGroupAdmins) {
                      _context6.next = 717;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.Badmin));

                  case 717:
                    _context6.next = 719;
                    return regeneratorRuntime.awrap(client.groupInviteCode(from));

                  case 719:
                    linkgc = _context6.sent;
                    reply('https://chat.whatsapp.com/' + linkgc);
                    return _context6.abrupt("break", 773);

                  case 722:
                    if (isGroup) {
                      _context6.next = 724;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.group));

                  case 724:
                    if (isOwner) {
                      _context6.next = 726;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 726:
                    if (isGroupAdmins) {
                      _context6.next = 728;
                      break;
                    }

                    return _context6.abrupt("return", reply(mess.only.admin));

                  case 728:
                    if (!(args.length < 1)) {
                      _context6.next = 730;
                      break;
                    }

                    return _context6.abrupt("return", reply('Hmmmm'));

                  case 730:
                    if (!(Number(args[0]) === 1)) {
                      _context6.next = 738;
                      break;
                    }

                    if (!isWelkom) {
                      _context6.next = 733;
                      break;
                    }

                    return _context6.abrupt("return", reply('Udah aktif um'));

                  case 733:
                    welkom.push(from);
                    fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom));
                    reply('Activó con éxito la función de bienvenida en este grupo✔️');
                    _context6.next = 739;
                    break;

                  case 738:
                    if (Number(args[0]) === 0) {
                      welkom.splice(from, 1);
                      fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom));
                      reply('Desactivar con éxito la función de bienvenida en este grupo ✔️');
                    } else {
                      reply('1 Activar, 0 Desactivar');
                    }

                  case 739:
                    return _context6.abrupt("break", 773);

                  case 740:
                    buf = fs.readFileSync("./src/audio/gogogo.mp3");
                    client.sendMessage(from, buf, audio, {
                      mimetype: 'audio/mp4',
                      quoted: mek,
                      ptt: true
                    });
                    return _context6.abrupt("break", 773);

                  case 743:
                    buf = fs.readFileSync("./src/audio/idols.mp3");
                    client.sendMessage(from, buf, audio, {
                      mimetype: 'audio/mp4',
                      quoted: mek,
                      ptt: true
                    });
                    return _context6.abrupt("break", 773);

                  case 746:
                    buf = fs.readFileSync("./src/audio/gogogonc.mp3");
                    client.sendMessage(from, buf, audio, {
                      mimetype: 'audio/mp4',
                      quoted: mek,
                      ptt: true
                    });
                    return _context6.abrupt("break", 773);

                  case 749:
                    if (!((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0)) {
                      _context6.next = 759;
                      break;
                    }

                    reply(mess.wait);
                    _encmedia5 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek;
                    _context6.next = 754;
                    return regeneratorRuntime.awrap(client.downloadMediaMessage(_encmedia5));

                  case 754:
                    media = _context6.sent;
                    _context6.next = 757;
                    return regeneratorRuntime.awrap(wait(media).then(function (res) {
                      client.sendMessage(from, res.video, video, {
                        quoted: mek,
                        caption: res.teks.trim()
                      });
                    })["catch"](function (err) {
                      reply(err);
                    }));

                  case 757:
                    _context6.next = 760;
                    break;

                  case 759:
                    reply('Solo una foto, hermano');

                  case 760:
                    return _context6.abrupt("break", 773);

                  case 761:
                    client.sendMessage(from, {
                      displayname: "Daniel",
                      vcard: vcard
                    }, MessageType.contact, {
                      quoted: mek
                    });
                    return _context6.abrupt("break", 773);

                  case 763:
                    if (!(isGroup && isSimi && budy != undefined)) {
                      _context6.next = 772;
                      break;
                    }

                    console.log(budy);
                    _context6.next = 767;
                    return regeneratorRuntime.awrap(simih(budy));

                  case 767:
                    muehe = _context6.sent;
                    console.log(muehe);
                    reply(muehe);
                    _context6.next = 773;
                    break;

                  case 772:
                    return _context6.abrupt("return");

                  case 773:
                    _context6.next = 778;
                    break;

                  case 775:
                    _context6.prev = 775;
                    _context6.t31 = _context6["catch"](0);
                    console.log('Error : %s', color(_context6.t31, 'red'));

                  case 778:
                  case "end":
                    return _context6.stop();
                }
              }
            }, null, null, [[0, 775], [71, 75, 79, 87], [80,, 82, 86], [278, 282, 286, 294], [287,, 289, 293], [311, 327], [388, 392, 396, 404], [397,, 399, 403], [415, 419, 423, 431], [424,, 426, 430], [439, 443, 447, 455], [448,, 450, 454], [463, 467, 471, 479], [472,, 474, 478], [490, 494, 498, 506], [499,, 501, 505], [523, 527, 531, 539], [532,, 534, 538], [545, 549, 553, 561], [554,, 556, 560], [577, 581, 585, 593], [586,, 588, 592], [614, 618, 622, 630], [623,, 625, 629], [663, 667, 671, 679], [672,, 674, 678], [693, 697, 701, 709], [702,, 704, 708]]);
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  });
}

starts();