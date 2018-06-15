import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {newEvaluation} from './actions/evaluations';
import {algorithm} from './logic';
import {getStudentList,createStudent,editStudent} from '../actions/students';
import './studentList.css';



class StudentList extends PureComponent {
    state = {}

    toggleOnClick = (e) => {
        const {id} = e.target
        if (this.state[id]==='block'){
            this.setState({
                [id]: 'none'
            }) 
        } 
            
            else {
                this.setState({
                    [id]: 'block',
                    [(id.split('_')[1]==='toggle')?id.split('_')[0]+'_grade':id.split('_')[0]+'_toggle']: 'none'
                })
            }
    }

    onChangeHandler = (e) => {
        const {name,value} = e.target
        this.setState ({
            [name]: value
        })
    }

    componentWillMount() {
        if (this.props.authenticated) {
            this.props.getStudentList(this.props.match.params.id)
        }
    }

    renderStudent = (student,teacherId) => {

        const {editStudent,newEvaluation} = this.props

        return (
            <div
                className="StudentGrid"
                key={student.id}
                style={{backroundColor:student.evaluation || 'blue'}}
            >

            <br/>
            <img
                src={student.photo}
                alt={student.fullName}
                style={{width:'100%'}}
            />
            <h1>{student.fullName}</h1>
            <br/>
            <input
                id={student.id + '_grade'}
                type="button"
                value="evaluation"
                onClick={this.toggleOnClick}
            />
            <input
                id={student.id + '_toggle'}
                type="button"
                value="edit"
                onClick={this.toggleOnClick}
            />
            <form
                id={student.id + '_editform'}
                style={{display:this.state[student.id + '_toggle'] || 'none'}}
                onSubmit={
                    (e)=>
                        {
                            this.setState({[student.id + '_toggle']: 'none'})
                            e.preventDefault()
                            editStudent(student.id,
                                this.state[student.id + '_editfullname'],
                                this.state[student.id + '_editphoto'],
                                student.bootcamp)
                        }
                }
            >

            <input
                type="text"
                name={student.id + '_editfullname'}
                placeholder="Full Name"
                onChange={this.onChangeHandler}
                value={this.state[this.id]}
            />

            <input
                type="text"
                name={student.id + "_editphoto"}
                placeholder="Photo"
                onChange={this.onChangeHandler}
                value={this.state[this.id]}
            />

            <input
                type="submit"
                value="Submit"
            />
            </form>
            <form
                id={student.id + '_evaluationform'}
                style={{display:this.state[student.id + '_evaluation'] || 'none'}}
                onSubmit={
                    (e)=>
                        {
                            this.setState({[student.id + '_evaluation']: 'none'})
                            e.preventDefault()
                            newEvaluation(this.state[student.id + '_editevaluation'] || student.evaluation,
                                this.state[student.id + '_editcomments'] || '',
                                student.id,teacherId|1)
                            
                        }
                }
            >
            <select
                name={student.id + "_editevaluation"}
                placeholder="Select"
                onChange={this.onchangeHandler}
                value={this.state[this.name]}
            >

                <option value={student.evaluation}>===select===</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
            </select>
            <textarea
                name={student.id + '_editcomments'}
                placeholder="Comments"
                onChange={this.onChangeHandler}
            ></textarea>
            <input
                type="submit"
                value="Submit"
            />
            </form>
            </div>

        )
    }
    
    render () {
        const {students,authenticated,createStudent,algorithm} = this.props
        if (!authenticated) return (<Redirect to="/home" />)

        if (students === null) return null

        return (
            <div>
                <div id="myModel"
                    className="model"
                    onClick={()=>this.setState({modeldisplay:'none'})}
                    style={{display:this.state.modeldisplay || 'none'}}
                >
                    <div className="model-content">
                        <span
                            className="close"
                            onClick={()=>this.setState({modeldisplay: 'none'})}
                            >&times;
                        </span>
                        <img
                            alt="randomImage"
                            id="randomImage"
                            src={this.state.randomImage || ''}
                            style={{maxWidth: '500px'}}
                        />
                        <h2
                            id="randomName"
                            style={{margin:'auto'}}
                        >{this.state.randomName || ''}
                        </h2>
                    </div>
                </div>
            <div className="outer-paper">
                <h1>Bootcamp #{this.props.match.params.id}</h1>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        createStudent(
                            this.state.fullname || '',
                            this.state.photo || '',
                            this.props.match.params.id)
                            }
                        }
                    >
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        onChange={this.onchangeHandler}
                        value={this.state.fullname}
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo"
                        onChange={this.onchangeHandler}
                        value={this.state.photo}
                    />
                    <input
                        type="submit"
                        value="New Student"
                    />
                    </form>
                    <br/><br/>
                    <input
                        type="button"
                        value="Ask Question"
                        onClick={() => {
                            const randomStudent = algorithm(this.props.match.params.id)
                            if (!randomStudent) {
                                alert('There are no students in this bootcamp...')
                                return null
                            }
                            
                            this.setState({
                                randomImage:randomStudent.photo,
                                randomName:randomStudent.fullname,
                                modeldisplay: 'block'})
                        }}

                        
                    />
                    <br/><br/>
                    {
                        this.props.students.lenght>0 &&
                        <div>
                            <div
                                className="bar red"
                                style={{width:(this.props.students.filter(x=>x.evaluation==='red').length/students.length)*100+'%'}}>
                            </div>
                            <div
                                className="bar yellow"
                                style={{width:(this.props.students.filter(x=>x.evaluation==='yellow').length/students.length)*100+'%'}}>
                            </div>
                            <div
                                className="bar green"
                                style={{width:(this.props.students.filter(x=>x.evaluation==='green').length/students.length)*100+'%'}}>
                            </div>
                            <div
                                className="bar blue"
                                style={{width:(this.props.students.filter(x=>x.evaluation==='not evaluated').length/students.length)*100+'%'}}>
                            </div>
                        </div>
                    }
                    </div>
                    <div>
                    {students.map(student => this.renderStudent(student,this.props.teacherId))}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teacherId: state.currentTeacher.id,
    authenticated: state.currentteacher !== null,
    teachers: state.teachers,
    students: state.students === null ? null : Object.values(state.students).sort((a,b) => a.id - b.id)

})


export default connect (mapStateToProps, {getStudentList,createStudent,editStudent,newEvaluation})(StudentList)