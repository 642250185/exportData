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


exportHsbAndWhshtAllSpuId();