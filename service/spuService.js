
const getAllhsbSpu = async() => {
    try {
        const result = await $hsbSpu.find({});
        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getAllWhshtSpu = async() => {
    try {
        const result = await $whshtSpu.find({});
        console.info(`result.size: `, result.length);
        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getAllAhsTablePC = async() => {
    try {
        let result = await $ahsSpu.find({"categoryId": 2});
        console.info(`ahsSpu_tablePC.size: ${result.length}`);
        return result;
    } catch (e) {
        console.error(e);
        return e;
    }
};


exports.getAllhsbSpu = getAllhsbSpu;
exports.getAllWhshtSpu = getAllWhshtSpu;
exports.getAllAhsTablePC = getAllAhsTablePC;