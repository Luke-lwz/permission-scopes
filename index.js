class PermissionScopes {
    constructor(scopes) {
        if (!Array.isArray(scopes)) throw new Error('Scopes must be of type: Array');
        for (let i = 0; i < scopes.length; i++) {
            let scope = scopes[i];
            if (typeof scope !== 'string') throw new Error('Scope in array must be of type: String');
            if (!/^[a-zA-Z0-9_]+$/.test(scope)) throw new Error("Scopes can only include alpha-numerical symbols and underscores");
        }
        this.scopes = scopes;
    }


    convert(input) {
        // Checks which type is given and converts it to the opposite
        if (typeof input === 'string' || Array.isArray(input)) return this.toInt(input);
        if (Number.isInteger(input)) return this.toScopes(input);
        throw new Error('Parameter must be of types: Integer, String or Array');
    }

    toInt(scopes) {
        if (typeof scopes !== 'string' && !Array.isArray(scopes)) throw new Error('Parameter must be of types: String or Array');
        if (typeof scopes === 'string') scopes = [scopes]; // turns string into array
        var int = 0;
        for (let i = 0; i < scopes.length; i++) {
            let scope = scopes[i];
            let indexOfScope = this.scopes.indexOf(scope);
            if (indexOfScope >= 0) {
                var bin = 2 ** indexOfScope;
                int += bin;
            } else throw new Error('Entered invalid scope');
        }
        return int;
    }

    toScopes(int) {
        if (!Number.isInteger(int)) throw new Error('Parameter must be of type: Integer');
        if (int <= 0) return []; // no permissions
        var maxInt = 2 ** this.scopes.length - 1;
        if (int > maxInt) throw new Error('Parsed integer exceeds maximum permission integer size')
        var scopesArray = [];
        for (let i = this.scopes.length; i >= 0; i--) { // loops through binary integers backwards
            let prevBin = 2 ** (i - 1); // binary integer smaller than int
            if (int >= prevBin) {
                scopesArray.unshift(this.scopes[i - 1]);
                int = int - prevBin;
            }
        }
        return scopesArray;
    }


    check(a, b) {
        var inputArr = [a, b];
        for (let i in inputArr) {
            if (typeof inputArr[i] !== 'string' && !Array.isArray(inputArr[i]) && !Number.isInteger(inputArr[i])) throw new Error('Parameter must be of types: Integer, String or Array');
            if (!Number.isInteger(inputArr[i])) inputArr[i] = this.toInt(inputArr[i]);
        }
        if (inputArr[0] == inputArr[1]) return true;
        return false;
    }


    all() {
        return 2 ** this.scopes.length - 1;
    }


}

module.exports = PermissionScopes;