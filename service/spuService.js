
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


exports.getAllhsbSpu = getAllhsbSpu;
exports.getAllWhshtSpu = getAllWhshtSpu;