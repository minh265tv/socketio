const controller = require('./controller');
const socket = require('../src/socket/index');

module.exports = class PatientCtrl extends controller {
    constructor(ctx) {
        super(ctx);
    }

    async sendMessage() {
        let validate = await this.validate(this.getBody(), {
            'title': 'required',
            'data': 'required',
            'email': 'required|email',
            'type': 'required'
        }, {
                'title.required': 'title không được bỏ trống',
                'data.required': 'data không được bỏ trống',
                'email.required': 'email không được bỏ trống',
                'email.email': 'email không hợp lệ',
                'type': 'type không được bỏ trống'
            });

        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        let email = this.getInput('email');
        let title = this.getInput('title');
        let body = this.getInput('body', '');
        let clickAction = this.getInput('clickAction', false);
        let data = this.getInput('data');
        let type = this.getInput('type');

        socket.sendMessage({email, title, body, clickAction, data, type });
        
        return this.response(true);
    }


}