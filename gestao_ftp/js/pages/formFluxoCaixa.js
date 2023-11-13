import { createComponent } from '../utils/pageUtils.js'
import { getSav } from '../services/protheusService.js';

// AGORA SAVS POSSUEM LETRAS
// $('#sav').keypress(e => acceptNumbersOnly(e))

const onLoadingChange = (val) => {
    $('#projectTitle').prop("disabled", val);
    $('#endDate').prop("disabled", val)
    $('#orderBalance').prop("disabled", val)
}

const setLoading = (val) => {
    if (typeof val === 'boolean')
        loading.value = val;
}

const loading = createComponent(false, onLoadingChange);

const fillFormSavFields = (sav) => {
    const { titulo, encerramento, saldo } = sav;

    const formattedDate = `${encerramento.substring(0, 4)}-${encerramento.substring(4, 6)}-${encerramento.substring(6, 8)}`

    const orderBalance = $('#orderBalance');

    $('#projectTitle').val(titulo);
    $('#endDate').val(formattedDate);
    orderBalance.val(saldo);
    formatCurrency(orderBalance, 'blur')
};

const loadSav = async (savId) => {
    setLoading(true);
    try {
        const sav = await getSav(savId);

        if (sav) fillFormSavFields(sav);
        else alert('Nenhum SAV encontrado')
    } catch {
        alert('Erro na busca de SAV')
    } finally {
        setLoading(false);
    }
};

let timer;

$('#sav').on('input', async (e) => {
    clearTimeout(timer);
    const savId = `${$(e.currentTarget).val()}`;

    if (savId.length >= 6)
        timer = setTimeout(() => loadSav(savId), 1500);
})