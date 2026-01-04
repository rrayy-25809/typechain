import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number; // 블록의 위치
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }

    static calculateHash(prevHash: string, height: number, data: string): string {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }
}

class Blockchain {
    private blocks: Block[];
    constructor() {
        this.blocks = []
    }

    private getPrevHash() : string {
        if (this.blocks.length === 0) return ""; // 첫 해시가 없으니 빈 문자열
        return this.blocks[this.blocks.length -1].hash; // 마지막 블록의 해시값 반환
    }

    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock); // 블록체인에 새 블록 추가
    }

    public getBlocks() {
        return [...this.blocks]; // 블록체인 복사본 반환 (변조 방지)
    }
}

const blockchain = new Blockchain();

blockchain.addBlock("첫 번째 블록");
blockchain.addBlock("두 번째 블록");
blockchain.addBlock("세 번째 블록");

console.log(blockchain.getBlocks());