import { React, Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getParamsUser } from '../../../redux/actions/usersActions'
import { updateProfile } from '../../../redux/actions/usersActions'
import { withRouter } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem'

import { CFormInput, CFormLabel, CButton, CModalFooter, CModalBody, CForm, CFormFeedback, CFormSelect } from '@coreui/react'
import { TextField } from '@mui/material'

class UpdateProfile extends Component {
       constructor() {
              super()
              this.state = {
                     Profile: null,
                     errors: {},
              }
              this.onChange = this.onChange.bind(this)
              this.handleClick = this.handleClick.bind(this)
       }
       componentWillMount() {
              this.props.match.params.userId && this.props.getParamsUser(this.props.match.params.userId)
       }

       componentWillReceiveProps(nextProps) {
              if (nextProps.auth.selectedUserById) {
                     this.setState({ Profile: nextProps.auth.selectedUserById })
              }
       }

       onChange(e) {
              this.setState({ [e.target.name]: e.target.value })
       }
       handleClick(userId) {
              this.setState({ errors: {} })
              this.props.updateProfile(
                     userId,
                     {
                            ...this.props.ProfileToUpdate,
                            ...this.state,
                     },
                     this.props.setVisible
              )
       }

       render() {
              const { errors } = this.state
              const { Profile } = this.state
              const gender = [
                     { label: 'Male', value: 'Male' },
                     { label: 'Female', value: 'Female' },
              ]

              const location = [
                     { label: 'Monestir', value: 'Monestir' },
                     { label: 'Tunis', value: 'Tunis' },
                     { label: 'France', value: 'France' },
              ]

              return (
                     <CForm onSubmit={this.onSubmit} className='mb-3'>
                            <CModalBody>
                                   <TextField
                                          fullWidth
                                          label='Address-mail'
                                          error={errors?.email}
                                          helperText={errors?.email}
                                          type='email'
                                          name='email'
                                          defaultValue={this.props.ProfileToUpdate?.email || Profile?.email}
                                          onChange={this.onChange}
                                          variant='standard'
                                   />
                                   &ensp;
                                   <TextField
                                          fullWidth
                                          label='phone'
                                          type='number'
                                          error={errors?.phone}
                                          helperText={errors?.phone}
                                          name='phone'
                                          defaultValue={this.props.ProfileToUpdate?.phone || Profile?.phone}
                                          onChange={this.onChange}
                                          variant='standard'
                                   />
                                   &ensp;
                                   <TextField
                                          fullWidth
                                          label='Bio'
                                          error={errors?.bio}
                                          helperText={errors?.bio}
                                          multiline
                                          name='bio'
                                          maxRows={4}
                                          defaultValue={this.props.ProfileToUpdate?.bio || Profile?.bio}
                                          onChange={this.onChange}
                                          variant='standard'
                                   />
                                   &ensp;
                                   <TextField
                                          fullWidth
                                          id='standard-select-currency'
                                          select
                                          label='Gender'
                                          error={errors?.gender}
                                          helperText={errors?.gender}
                                          variant='standard'
                                          name='gender'
                                          defaultValue={this.props.ProfileToUpdate?.gender || Profile?.gender}
                                          onChange={this.onChange}
                                   >
                                          {gender.map((option) => (
                                                 <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                 </MenuItem>
                                          ))}
                                   </TextField>
                                   &ensp;
                                   <TextField
                                          label='Birthday'
                                          fullWidth
                                          error={errors?.birthday}
                                          helperText={errors?.birthday}
                                          type='date'
                                          name='birthday'
                                          defaultValue={this.props.ProfileToUpdate?.birthday || Profile?.birthday}
                                          onChange={this.onChange}
                                          variant='standard'
                                   />
                                   &ensp;
                                   <TextField
                                          fullWidth
                                          label='address'
                                          error={errors?.address}
                                          helperText={errors?.address}
                                          name='address'
                                          defaultValue={this.props.ProfileToUpdate?.address || Profile?.address}
                                          onChange={this.onChange}
                                          variant='standard'
                                   />
                                   &ensp;
                                   <TextField
                                          fullWidth
                                          label='Company'
                                          disabled
                                          error={errors?.company}
                                          helperText={errors?.company}
                                          name='company'
                                          value='MOBELITE'
                                          onChange={this.onChange}
                                          variant='standard'
                                   />
                                   &ensp;
                                   <TextField
                                          fullWidth
                                          id='standard-select-currency'
                                          select
                                          label='Location'
                                          error={errors?.location}
                                          helperText={errors?.location}
                                          variant='standard'
                                          name='location'
                                          defaultValue={this.props.ProfileToUpdate?.location || Profile?.location}
                                          onChange={this.onChange}
                                   >
                                          {location.map((option) => (
                                                 <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                 </MenuItem>
                                          ))}
                                   </TextField>
                            </CModalBody>
                            <CModalFooter>
                                   <CButton
                                          style={{ backgroundColor: '#808080' }}
                                          color='light'
                                          variant='outline'
                                          shape='rounded-15'
                                          onClick={() => this.handleClick(this.props.ProfileToUpdate?._id)}
                                   >
                                          UPDATE
                                   </CButton>
                            </CModalFooter>
                     </CForm>
              )
       }
}
UpdateProfile.propTypes = {
       getParamsUser: PropTypes.func.isRequired,
       updateProfile: PropTypes.func.isRequired,
       auth: PropTypes.object.isRequired,
       errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
       auth: state.auth,
       errors: state.errors,
})
export default connect(mapStateToProps, { getParamsUser, updateProfile })(withRouter(UpdateProfile))
