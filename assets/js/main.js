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
        console.log('Formulario nao enviado');
    }

    checkFields(){
        let valid = true;
        for(let field of  this.formulario.querySelectorAll('.validar')){
            const label = field.previousElementSibling.innerText;

        if(!field.value) {
        this.criaErro(field, `"${label}" não pode estar em branco.`);
        valid = false;
            }
        }
    }

    criaErro(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
      }

}

const valida = new ValidaForm();