require('../schema');

const fs = require('fs-extra');
const xlsx = require('node-xlsx').default;
const {spuService} = require('../service');

const config = require('../config');
const {DOWNLOAD_PATH} = config;

const getHsbAndWhshtAllSpuId = async() => {
    try {
        const hsbSpuList = await spuService.getAllhsbSpu();
        const whshtSpuList = await spuService.getAllWhshtSpu();
        console.info(`hsbSpu.Size: ${hsbSpuList.length},   whshtSpu.Size: ${whshtSpuList.length}`);
        const arr_hsbSpuId = [];
        const arr_whshtSpuId = [];
        for(const hsbSpu of hsbSpuList){
            arr_hsbSpuId.push({
                pid: hsbSpu.pid,
                pname: hsbSpu.pname
            });
        }
        for(const whshtSpu of whshtSpuList){
            arr_whshtSpuId.push({
                pid: whshtSpu.pid,
                pname: whshtSpu.pname
            });
        }
        return {arr_hsbSpuId, arr_whshtSpuId}
    } catch (e) {
        console.error(e);
        return []
    }
};

const get_pjt_spus = async() => {

    const pjt_spu_res = await spuService.get_All_PJT_SPU();
    console.info('pjt_spu_res.size: %d', pjt_spu_res.length);
    const header = ['品牌','机型ID', '机型名称'];
    const final = [];
    final.push(header);

    for(const item of pjt_spu_res){
        const row = [];
        row.push(item.bname);
        row.push(item.pid);
        row.push(item.pname);
        final.push(row);
    }

    const fileName = '拍机堂APP机型.xlsx';
    const fileDir = `${DOWNLOAD_PATH}/${fileName}`;
    await fs.ensureDir(DOWNLOAD_PATH);
    fs.writeFileSync(fileDir, xlsx.build([
        {name: "拍机堂APP", data: final}
    ]));
    console.info(`文件已导出: ${fileDir}`);
    return {err: null, fileName};
};

const exportHsbAndWhshtAllSpuId = async() => {
    try {
        const {arr_hsbSpuId, arr_whshtSpuId} = await getHsbAndWhshtAllSpuId();
        const header = ['机型ID', '机型名称'];
        const hsbSpuList = []; const whshtSpuList = [];
        hsbSpuList.push(header);
        whshtSpuList.push(header);
        for(const hsb of arr_hsbSpuId){
            const row = [];
            row.push(hsb.pid);
            row.push(hsb.pname);
            hsbSpuList.push(row);
        }
        for(const whsht of arr_whshtSpuId){
            const row = [];
            row.push(whsht.pid);
            row.push(whsht.pname);
            whshtSpuList.push(row);
        }

        const fileName = '机型ID.xlsx';
        const fileDir = `${DOWNLOAD_PATH}/${fileName}`;
        await fs.ensureDir(DOWNLOAD_PATH);
        fs.writeFileSync(fileDir, xlsx.build([
            {name: "回收宝", data: hsbSpuList},
            {name: "微回收后台", data: whshtSpuList}
        ]));
        console.info(`文件已导出: ${fileDir}`);
        return {err: null, fileName};
    } catch (e) {
        console.error(e);
        return {err: '导出数据失败, 请联系管理员'};
    }
};

const getAllAhsSpu = async() => {
    try {
        let res = await spuService.getAllAhsTablePC();
        let pids= [];
        for(let item of res){
            pids.push(parseInt(item.pid))
        }
        console.info('pids: %j', pids);
        return pids;
    } catch (e) {
        console.error(e);
        return e;
    }
};


get_pjt_spus();