import { FollowUp } from '@psycare/entities';
import { FollowUpType } from '@psycare/enums';

export const followUpData: Partial<FollowUp>[] = [
    {
        title: 'Leitura do livro \'Mindfulness e Equilíbrio Emocional\'',
        type: FollowUpType.normal,
        check: false,
        description: 'Concluir a leitura do livro indicado durante as sessões para desenvolver técnicas de mindfulness.'
    },
    {
        title: 'Prática diária de exercícios de relaxamento',
        type: FollowUpType.continuous,
        check: false,
        description: 'Realizar exercícios de relaxamento diariamente para melhorar o controle da ansiedade.'
    },
    {
        title: 'Registro do diário de emoções',
        type: FollowUpType.continuous,
        check: false,
        description: 'Manter um diário de emoções para acompanhar sentimentos e identificar padrões ao longo do tempo.'
    },
    {
        title: 'Assistir ao filme \'Em Busca da Felicidade\'',
        type: FollowUpType.normal,
        check: true,
        description: 'Assistir ao filme sugerido para reflexão sobre superação e resiliência.'
    },
    {
        title: 'Prática de Mindfulness por 10 minutos diários',
        type: FollowUpType.continuous,
        check: false,
        description: 'Incorporar a prática de mindfulness na rotina diária para promover a atenção plena.'
    },
    {
        title: 'Participação em grupo de apoio online',
        type: FollowUpType.continuous,
        check: false,
        description: 'Engajar-se em um grupo de apoio online para compartilhar experiências e obter suporte adicional.'
    },
    {
        title: 'Implementação de técnicas de comunicação interpessoal',
        type: FollowUpType.continuous,
        check: false,
        description: 'Desenvolver e praticar técnicas de comunicação para melhorar relacionamentos interpessoais.'
    }
];
