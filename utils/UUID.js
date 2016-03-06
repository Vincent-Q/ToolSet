syncmod.define('util.UUID', function(){
	function UUID(){
        throw 'util.UUID cannot be instantiated!'
	}

	UUID.createId = function(){
		var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var _chars = CHARS,
            _random = Math.random,
            i = 0,
            uuid = new Array(36),
            rnd = 0;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (; i < 36; ++i) {
            if (i !== 8 && i !== 13 && i !== 18 && i !== 14 && i !== 23) {
                if (rnd <= 0x02) {
                    rnd = 0x2000000 + (_random() * 0x1000000) | 0;
                }
                rnd >>= 4;
                uuid[i] = _chars[(i === 19) ? ((rnd & 0xf) & 0x3) | 0x8 : rnd & 0xf];
            }
        }
        return uuid.join('');
	}

	return UUID;
});