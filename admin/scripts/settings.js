
        let general_data,contacts_data;
        let general_s_form=document.getElementById('general_s_form');
        let site_title_inp = document.getElementById('site_title_inp');
        let site_about_inp = document.getElementById('site_about_inp');
        let contacts_s_form = document.getElementById('contacts_s_form');
        
        function get_general() {
            let site_title = document.getElementById('site_title');
            let site_about = document.getElementById('site_about');
            let shutdown_toggle=document.getElementById('shutdown-toggle');
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                general_data = JSON.parse(this.responseText);
                site_title.innerText = general_data.site_title;
                site_about.innerText = general_data.site_about;
                site_title_inp.value = general_data.site_title;
                site_about_inp.value = general_data.site_about; 
                if(general_data.shutdown==0){
                        shutdown_toggle.checked=false;
                        shutdown_toggle.value=0;
                }
                else{
                            shutdown_toggle.checked=true;
                            shutdown_toggle.value=1;  
                }
            
            
            
            };
            xhr.send('get_general');
        }
        general_s_form.addEventListener('submit',function(e){
            e.preventDefault();
            upd_general(site_title_inp.value, site_about_inp.value);
        })

        function upd_general(site_title_val, site_about_val) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                let myModal = document.getElementById('general-s');
                let modal = bootstrap.Modal.getInstance(myModal);
                modal.hide();
                if (this.responseText == 1) {
                    alert('success','Changes saved!');
                    get_general();
                } else {
                    alert('error','No changes made!');
                }
            };
            xhr.send('site_title=' + site_title_val + '&site_about=' + site_about_val + '&upd_general');
        }
        function upd_shutdown(val) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (this.responseText == 1&& general_data.shutdown==0) {
                    alert('success','Site has been shutdown!');
                } else {
                    alert('success','Shutdown mode off!');
                }
                get_general();
            };
            xhr.send('&upd_shutdown='+val);
        }
        function get_contacts() {
            let contacts_p_id = ['address', 'gmap', 'pn1', 'pn2', 'email', 'fb', 'insta', 'tw'];
            let iframe = document.getElementById('iframe'); 
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {     
                        contacts_data = JSON.parse(this.responseText);
                        contacts_data=Object.values(contacts_data);
                            for (let i = 0; i < contacts_p_id.length; i++) {
                                document.getElementById(contacts_p_id[i]).innerHTML=contacts_data[i+1]; 
                            }
                            iframe.src=contacts_data[9];
                            contacts_inp(contacts_data);
            }
            xhr.send("get_contacts");
        }
        function contacts_inp(data){
            let contacts_inp_id= ['address_inp', 'gmap_inp', 'pn1_inp', 'pn2_inp', 'email_inp', 'fb_inp', 'insta_inp', 'tw_inp','iframe_inp'];
            for(i=0;i<contacts_inp_id.length;i++){
                document.getElementById(contacts_inp_id[i]).value=data[i+1];
            }

        }
        contacts_s_form.addEventListener('submit',function(e){
            e.preventDefault();
            upd_contacts();
        })
        function upd_contacts(){
            let index =['address', 'gmap', 'pn1', 'pn2', 'email', 'fb', 'insta', 'tw','iframe'];
            let contacts_inp_id= ['address_inp', 'gmap_inp', 'pn1_inp', 'pn2_inp', 'email_inp', 'fb_inp', 'insta_inp', 'tw_inp','iframe_inp'];
            let data_str="";
            for(i=0;i<index.length;i++){
                data_str+=index[i]+"="+document.getElementById(contacts_inp_id[i]).value+'&';

            }
            data_str+="upd_contacts";
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () { 
                let myModal = document.getElementById('contacts-s');
                let modal = bootstrap.Modal.getInstance(myModal);
                modal.hide();
                if (this.responseText == 1) {
                    alert('success','Changes saved!');
                    get_contacts();
                } else {
                    alert('error','No changes made!');
                }

            }
            xhr.send(data_str);
        }
        document.getElementById('team_s_form').addEventListener('submit', function (e) {
            e.preventDefault();
            add_member();
        });

        function add_member() {
            let data = new FormData();
            data.append('name', member_name_inp.value);
            data.append('picture', member_picture_inp.files[0]);
            data.append('add_member', '');

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);

            xhr.onload = function () {
                let myModal = document.getElementById('team-s');
                let modal = bootstrap.Modal.getInstance(myModal);
                modal.hide();

                switch (this.responseText) {
                    case 'inv_img':
                        alert('error', 'Only JPG and PNG images are allowed');
                        break;
                    case 'inv_size':
                        alert('error', 'Image should be less than 2MB!');
                        break;
                    case 'upd_failed':
                        alert('error', 'Image upload failed due to server error!');
                        break;
                    default:
                        alert('success', 'New member added!');
                        member_name_inp.value = '';
                        member_picture_inp.value = '';
                        break;
                }
            };

            xhr.send(data);
        }
        function get_members() {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                if (this.status === 200) {
                    document.getElementById("team-data").innerHTML = this.responseText;
                } else {
                    alert("Failed to load members.");
                }
            }
            xhr.send("get_members=true");
        }

        function rem_members(sr_no) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "ajax/settings_crud.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                if (this.responseText == 1) {
                    alert('success', 'Member removed!');
                    get_members(); 
                } else {
                    alert('error', 'Failed to remove member. Server error!');
                }
            };
            xhr.send("rem_members=" + sr_no);
        }
        window.onload = function () {
            get_general();
            get_contacts();
            get_members();
        };