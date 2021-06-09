import React from 'react';

class ProfileStatus extends React.Component {

    // локальный state
    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps, pervState) {
        // в данном случае необходимо setState положить в условие, иначе начнется рекурсия (setState - componentDidUpdate - setState - componentDidUpdate и тд)
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        };
    };

    // if (!props.profile) {
    //     return <Preloader />
    // }

    // в данном случае нужна стрелочная функция, чтобы не потерялся контекст при callback на doubleClick
    activateEditMode = () => {
        // данный способ изменения свойства editMode нежелателен, тк приходится обновлять локальный state через forceUpdate
        // this.state.editMode = true;
        // this.forceUpdate();

        // через setState(асинхронная функция) меняем значение свойства editMode у локального state
        this.setState({
            editMode: true
        });
    };

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusThC(this.state.status);
    };

    onStatusChange = (e) => {
        // получаем новое значение с input и записываем его в локальный state
        this.setState({
            status: e.currentTarget.value
        });
    };
    

    render() {
        // onBlur срабатывает, когда убираем фокус
        // в span передаем статус через this.props.status (из BLL), а в input передаем из this.state.status (локальный state) --- span тражает статус из BLL, в то время модно менять через input локальный статус, затем отправлять запрос на сервер, чтобы его изменить, откуда он снова поступает в span
        return (
            <div>
                {this.state.editMode
                    ? <input 
                        type="text" 
                        onChange={this.onStatusChange} 
                        value={this.state.status} 
                        onBlur={this.deActivateEditMode} 
                        autoFocus />
                    : <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Enter your status'}</span>}
            </div>
        );
    };
};

export default ProfileStatus;
