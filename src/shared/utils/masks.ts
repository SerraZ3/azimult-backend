const masks = {
  cpf_cnpj_mask: (value: string) => {
    if (value.replace(/[^0-9 ]/g, '').length <= 11) {
      return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    } else {
      return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }
  },
  cellphoneBrMask: (value: string) => {
    if (value.length < 3) {
      return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2');
    } else {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)(\d)/, '($1) $2 $3')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }
  },
};
export default masks;
