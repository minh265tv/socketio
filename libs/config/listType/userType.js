const underscore = require('underscore');

const userType = {
    'CONST_STATUS_AVAILABLE': 'available',
    'CONST_STATUS_DISABLED': 'disabled',
    'CONST_STATUS_DELETED': 'deleted',
    'listStatus': [
        {
            code: userType.CONST_STATUS_AVAILABLE,
            name: "Hoạt động"
        },
        {
            code: userType.CONST_STATUS_DISABLED,
            name: "Dừng hoạt động"
        },
        {
            code: userType.CONST_STATUS_DELETED,
            name: "Đã xóa"
        },
    ],
    existStatus: (arrStatus) => {
        let listStatusCode = underscore.pluck(userType.listStatus, 'code');
        let result = true;
        underscore.each(arrStatus, (item, key) => {
            if(listStatusCode.indexOf(item) == -1){
                result = false;
            }
        });

        return result;
    }
}

module.exports = userType;