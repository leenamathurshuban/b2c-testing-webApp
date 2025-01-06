import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function FourPointInspection(props) {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                className='inspection_tips_modl'
            >

                <Modal.Body>
                   <div className='inspection_tips_text'>
                    <h3>Simple Four Point Inspection</h3>
                    <div className='cnt_outer'>
                        <div className='text'>
                            <h4>Power Up + Software Check</h4>
                            <p>Power up your device and check that the operating system and software operates correctly.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 shrink-0 text-gray-400" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"></path></svg>
                    </div>
                    <div className='cnt_outer'>
                        <div className='text'>
                            <h4>Check Screen + Camera</h4>
                            <p>Scratches vs Cracks: Scratches on the screen are normal wear and tear, but cracks on the screen or camera are considered damage. If you run your fingernail across the area applying pressure and your fingernail catches, it is a crack, otherwise it's likely just a scratch.</p>
                            <p>Screen malfunction: Damaged screens may display only a single color, distorted colors, or flicker.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 shrink-0 text-gray-400" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path></svg>
                    </div>
                    <div className='cnt_outer'>
                        <div className='text'>
                            <h4>Check Buttons or Keyboard and Trackpad</h4>
                            <p>Look for broken or missing keys. Check that all keys and buttons are functional and that the trackpad is responsive.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 shrink-0 text-gray-400" aria-hidden="true"><path d="M6 10H6.01M8 14H8.01M10 10H10.01M12 14H12.01M14 10H14.01M16 14H16.01M18 10H18.01M5.2 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V9.2C22 8.0799 22 7.51984 21.782 7.09202C21.5903 6.71569 21.2843 6.40973 20.908 6.21799C20.4802 6 19.9201 6 18.8 6H5.2C4.07989 6 3.51984 6 3.09202 6.21799C2.71569 6.40973 2.40973 6.71569 2.21799 7.09202C2 7.51984 2 8.07989 2 9.2V14.8C2 15.9201 2 16.4802 2.21799 16.908C2.40973 17.2843 2.71569 17.5903 3.09202 17.782C3.51984 18 4.0799 18 5.2 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                    <div className='cnt_outer'>
                        <div className='text'>
                            <h4>Check Housing</h4>
                            <p>Minor scratches are considered normal wear and tear, but cracks and severe dents to the housing are considered damage.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 shrink-0 text-gray-400" aria-hidden="true"><path d="M3 16V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V16H15.6627C15.4182 16 15.2959 16 15.1808 16.0276C15.0787 16.0521 14.9812 16.0925 14.8917 16.1474C14.7908 16.2092 14.7043 16.2957 14.5314 16.4686L14.4686 16.5314C14.2957 16.7043 14.2092 16.7908 14.1083 16.8526C14.0188 16.9075 13.9213 16.9479 13.8192 16.9724C13.7041 17 13.5818 17 13.3373 17H10.6627C10.4182 17 10.2959 17 10.1808 16.9724C10.0787 16.9479 9.98119 16.9075 9.89172 16.8526C9.7908 16.7908 9.70432 16.7043 9.53137 16.5314L9.46863 16.4686C9.29568 16.2957 9.2092 16.2092 9.10828 16.1474C9.01881 16.0925 8.92127 16.0521 8.81923 16.0276C8.70414 16 8.58185 16 8.33726 16H3ZM3 16C2.44772 16 2 16.4477 2 17V17.3333C2 17.9533 2 18.2633 2.06815 18.5176C2.25308 19.2078 2.79218 19.7469 3.48236 19.9319C3.7367 20 4.04669 20 4.66667 20H19.3333C19.9533 20 20.2633 20 20.5176 19.9319C21.2078 19.7469 21.7469 19.2078 21.9319 18.5176C22 18.2633 22 17.9533 22 17.3333C22 17.0233 22 16.8683 21.9659 16.7412C21.8735 16.3961 21.6039 16.1265 21.2588 16.0341C21.1317 16 20.9767 16 20.6667 16H20" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                   </div>
                   <Button onClick={props.onHide}>Close</Button>
                </Modal.Body>
                
            </Modal>
        </>
    );
}

export default FourPointInspection;