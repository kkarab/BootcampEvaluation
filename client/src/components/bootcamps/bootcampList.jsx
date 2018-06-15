import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {addBootcamp, getBootcampList} from './actions/bootcamps';

class BootcampList extends PureComponent {
    
    state = {}

    onChangeHandler = (e) => {
        const {name,value} = e.target
        this.setState ({
            [name]: value
        })
    }
    
    componentWillMount() {
        if (this.props.authenticated) {
            if (this.props.bootcamps ===null) this.props.getBootcampList()
        }
    }

    renderBootcamp = (bootcamp) => {

        return (
            <div>
                Bootcamp #{bootcamp.bootcamp}
                <br/>
                Starting: {bootcamp.startDate} | Ending: {bootcamp.endDate}
                <br/>
                <input type="button" value="Details"
                    size="small"
                    onClick={() => {this.props.history.push(`/bootcamps/${bootcamp.bootcamp}`)}}
                /><hr/>
            </div>
            

            
        )
    }

    render() {
        const {bootcamps,authenticated,createbootcamp} = this.props

        if (!authenticated) return (<Redirect to="/home"/>)

        if (bootcamps === null) return null

        return (
            <div>
                <input
                    type="number"
                    name="bootcamp"
                    placeholder="Bootcamp #"
                    onChange={this.onChangeHandler}
                    value={this.state.bootcamp || ''}
                />
                <input
                    type="date"
                    name="starts"
                    placeholder="Starts"
                    onChange={this.onChangeHandler}
                    value={this.state.startDate || ''}
                />
                <input
                    type="date"
                    name="ends"
                    placeholder="Ends"
                    onChange={this.onChangeHandler}
                    value={this.state.endDate || ''}
                />
                <input
                    type="button"
                    value="Add Bootcamp"
                    onClick={
                        ()=>addBootcamp(this.state.bootcamp,this.state.startDate,this.state.endDate)}
                />
                <div>
                    {bootcamps.map(bootcamp => this.renderBootcamp(bootcamp))}
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.currentTeacher !== null,
    teachers: state.teachers,
    bootcamps: state.bootcamps === null ? null : Object.values(state.bootcamps).sort((a,b) => b.id - a.id)
})

export default connect (mapStateToProps, {getBootcampList, addBootcamp})(BootcampList)
