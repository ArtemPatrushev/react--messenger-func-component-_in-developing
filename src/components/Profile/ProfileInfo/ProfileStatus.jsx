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
        this.setState({
            status: e.currentTarget.value
        });
    };
    

    render() {
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
