class ValidaForm{ 

    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit',e =>{
            this.handleSubmit(e);

        });
    }

    handleSubmit(e){
        e.preventDefault();
        const validFields = this.checkFields();
        const validPasswords = this.checkPassword();
        console.log('Formulario nao enviado');
    }

    checkFields(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
          errorText.remove();
        }
    
        for(let field of this.formulario.querySelectorAll('.validar')) {
          const label = field.previousElementSibling.innerText;
    
          if(!field.value) {
            this.createError(field, `Campo "${label}" não pode estar em branco.`);
            this.addInvalidClass(field);
            valid = false;
          }
    
          if(field.classList.contains('cpf')) {
            if(!this.validaCPF(field)) {
            valid = false;
            this.addInvalidClass(field);
          }
          }
          


          if(field.classList.contains('usuario')) {
            if(!this.validaUsuario(field)){
            valid = false;
          }
          
          }
        }
    }

    checkPassword(){
      let valid = true;
      const senha = this.formulario.querySelector('.senha');
      const repetirSenha = this.formulario.querySelector('.repetir-senha');
  
      if(senha.value !== repetirSenha.value) {
        this.createError(senha, 'Campos senha e repetir senha precisar ser iguais.');
        this.createError(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
        valid = false;
        
      }
  
      if(senha.value.length < 6 || senha.value.length > 12) {  
        this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
        valid = false;
      }
      this.addSuccessClass(field);
      this.removeInvalidClass(field);
      return valid;
    }

    validaCPF(field) {
      const cpf = new ValidaCPF(field.value);
  
      if (!cpf.valida()) {
        this.createError(field, 'CPF inválido.');
        this.addInvalidClass(field);
        return false; 
      }
      this.removeInvalidClass(field);
      this.addSuccessClass(field); // Adiciona a classe "success" ao input de CPF
      return true; 
    }

    validaUsuario(field){
      let valid = true;
      const usuario = field.value;
      if(usuario.length < 3 || usuario.length>12){
        this.createError(field, 'Usuario precisa ter entre 3 e 12 caracteres');
        this.addInvalidClass(field);
        valid = false;
      }
      if(!usuario.match(/[a-zA-Z0-9]+/g) || usuario.length>12){
        this.createError(field, 'So pode conter letra e ou numeros');
        this.addInvalidClass(field);
        valid = false;
      }
      this.removeInvalidClass(field);
      this.addSuccessClass(field);
      return valid;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }

    addSuccessClass(field) {
      field.classList.add('success');
    }

    addInvalidClass(field) {
      field.classList.add('Invalid');
    }

    removeInvalidClass(field){
    field.classList.remove('Invalid');
    }

}

const valida = new ValidaForm();