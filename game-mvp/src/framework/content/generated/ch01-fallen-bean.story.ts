import type { StoryPackageInput } from '../storySchema'

export const generatedChapterStory: StoryPackageInput = {
  "id": "chapter-01-fallen-bean",
  "version": 1,
  "title": "第一章：落地的豆子",
  "startSceneId": "scene-01",
  "audio": {
    "bgm": "/audio/ambient-loop.wav",
    "sfx": {
      "softClick": "/audio/soft-click.wav",
      "pulse": "/audio/pulse-hit.wav",
      "confirm": "/audio/confirm.wav"
    }
  },
  "scenes": [
    {
      "id": "scene-01",
      "kind": "narrative",
      "title": "叙事片段 01",
      "tone": "calm",
      "lines": [
        "早上六点醒来，伴随着头痛和干涩的眼睛，在床上刷手机，到10点才不得不起床"
      ],
      "cues": [
        {
          "id": "scene-01-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-02"
    },
    {
      "id": "scene-02",
      "kind": "interaction",
      "title": "互动片段 01",
      "instruction": "通过连续点击把失控的节奏拉回稳定。",
      "pluginId": "tap-sequence",
      "pluginConfig": {
        "targetTaps": 9,
        "actionLabel": "点击保持节奏",
        "variableKey": "tapBeat_01"
      },
      "completeMutation": {
        "key": "beat_01_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-02-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-03"
    },
    {
      "id": "scene-03",
      "kind": "narrative",
      "title": "叙事片段 02",
      "tone": "tense",
      "lines": [
        "去了公司就开始开会，回应群里的各种各样的艾特，一整天都忙忙碌碌，任务越积累越多，下班已经是深夜了"
      ],
      "cues": [
        {
          "id": "scene-03-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-04"
    },
    {
      "id": "scene-04",
      "kind": "interaction",
      "title": "互动片段 02",
      "instruction": "通过连续点击把失控的节奏拉回稳定。",
      "pluginId": "tap-sequence",
      "pluginConfig": {
        "targetTaps": 10,
        "actionLabel": "点击保持节奏",
        "variableKey": "tapBeat_02"
      },
      "completeMutation": {
        "key": "beat_02_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-04-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-05"
    },
    {
      "id": "scene-05",
      "kind": "narrative",
      "title": "叙事片段 03",
      "tone": "tense",
      "lines": [
        "好不容易到了周末，在家一整天都在睡觉，一觉醒来已是黄昏",
        "橙色天光下，心中充满了抑郁和烦躁的情绪"
      ],
      "cues": [
        {
          "id": "scene-05-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-06"
    },
    {
      "id": "scene-06",
      "kind": "interaction",
      "title": "互动片段 03",
      "instruction": "在两个方向之间反复选择，推动情绪往前。",
      "pluginId": "choice-balance",
      "pluginConfig": {
        "leftLabel": "退回惯性",
        "rightLabel": "向前一步",
        "targetSide": "right",
        "requiredHits": 3,
        "variableKey": "choiceBeat_03"
      },
      "completeMutation": {
        "key": "beat_03_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-06-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-07"
    },
    {
      "id": "scene-07",
      "kind": "narrative",
      "title": "叙事片段 04",
      "tone": "warm",
      "lines": [
        "如果不是因为猫已经饿得喵喵叫了一天，也许还会这样睡下去",
        "昨天中午点的外卖，到今天晚上还没有拿进屋里"
      ],
      "cues": [
        {
          "id": "scene-07-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-08"
    },
    {
      "id": "scene-08",
      "kind": "interaction",
      "title": "互动片段 04",
      "instruction": "在两个方向之间反复选择，推动情绪往前。",
      "pluginId": "choice-balance",
      "pluginConfig": {
        "leftLabel": "继续躺着",
        "rightLabel": "去照顾生活",
        "targetSide": "right",
        "requiredHits": 4,
        "variableKey": "choiceBeat_04"
      },
      "completeMutation": {
        "key": "beat_04_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-08-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-09"
    },
    {
      "id": "scene-09",
      "kind": "narrative",
      "title": "叙事片段 05",
      "tone": "tense",
      "lines": [
        "热情的前同事得知我来了这个城市，邀请我去她家玩",
        "每次都答应，临出发时又感到无法承受的社交压力，焦虑之下满怀愧疚地放了鸽子",
        "多次之后也没有再收到邀请了"
      ],
      "cues": [
        {
          "id": "scene-09-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-10"
    },
    {
      "id": "scene-10",
      "kind": "interaction",
      "title": "互动片段 05",
      "instruction": "在两个方向之间反复选择，推动情绪往前。",
      "pluginId": "choice-balance",
      "pluginConfig": {
        "leftLabel": "取消出门",
        "rightLabel": "尝试赴约",
        "targetSide": "right",
        "requiredHits": 3,
        "variableKey": "choiceBeat_05"
      },
      "completeMutation": {
        "key": "beat_05_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-10-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-11"
    },
    {
      "id": "scene-11",
      "kind": "narrative",
      "title": "叙事片段 06",
      "tone": "tense",
      "lines": [
        "体检单上打了红色叹号的项目比上一年更多了"
      ],
      "cues": [
        {
          "id": "scene-11-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-12"
    },
    {
      "id": "scene-12",
      "kind": "interaction",
      "title": "互动片段 06",
      "instruction": "在两个方向之间反复选择，推动情绪往前。",
      "pluginId": "choice-balance",
      "pluginConfig": {
        "leftLabel": "退回惯性",
        "rightLabel": "向前一步",
        "targetSide": "right",
        "requiredHits": 4,
        "variableKey": "choiceBeat_06"
      },
      "completeMutation": {
        "key": "beat_06_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-12-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-13"
    },
    {
      "id": "scene-13",
      "kind": "narrative",
      "title": "叙事片段 07",
      "tone": "neutral",
      "lines": [
        "世界是一个巨大的黄豆加工厂，有的豆子被送去做豆浆，有的做豆腐，有的去做种子",
        "大家从出生起，初中、高中、大学，经过一道道关卡，根据形状、大小和健康程度被筛选，被送到了合适的流水线上，各有去处，各有使命"
      ],
      "cues": [
        {
          "id": "scene-13-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-14"
    },
    {
      "id": "scene-14",
      "kind": "interaction",
      "title": "互动片段 07",
      "instruction": "通过连续点击把失控的节奏拉回稳定。",
      "pluginId": "tap-sequence",
      "pluginConfig": {
        "targetTaps": 9,
        "actionLabel": "点击保持节奏",
        "variableKey": "tapBeat_07"
      },
      "completeMutation": {
        "key": "beat_07_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-14-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-15"
    },
    {
      "id": "scene-15",
      "kind": "narrative",
      "title": "叙事片段 08",
      "tone": "calm",
      "lines": [
        "不出意外的话，每个豆子都能获得充实圆满的一生"
      ],
      "cues": [
        {
          "id": "scene-15-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-16"
    },
    {
      "id": "scene-16",
      "kind": "interaction",
      "title": "互动片段 08",
      "instruction": "在两个方向之间反复选择，推动情绪往前。",
      "pluginId": "choice-balance",
      "pluginConfig": {
        "leftLabel": "退回惯性",
        "rightLabel": "向前一步",
        "targetSide": "right",
        "requiredHits": 4,
        "variableKey": "choiceBeat_08"
      },
      "completeMutation": {
        "key": "beat_08_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-16-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-17"
    },
    {
      "id": "scene-17",
      "kind": "narrative",
      "title": "叙事片段 09",
      "tone": "calm",
      "lines": [
        "不出意外的话，可是偏偏出了意外"
      ],
      "cues": [
        {
          "id": "scene-17-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ],
      "nextSceneId": "scene-18"
    },
    {
      "id": "scene-18",
      "kind": "interaction",
      "title": "互动片段 09",
      "instruction": "通过连续点击把失控的节奏拉回稳定。",
      "pluginId": "tap-sequence",
      "pluginConfig": {
        "targetTaps": 11,
        "actionLabel": "点击保持节奏",
        "variableKey": "tapBeat_09"
      },
      "completeMutation": {
        "key": "beat_09_done",
        "value": true
      },
      "cues": [
        {
          "id": "scene-18-pulse",
          "atMs": 120,
          "sfxId": "pulse"
        }
      ],
      "nextSceneId": "scene-19"
    },
    {
      "id": "scene-19",
      "kind": "narrative",
      "title": "叙事片段 10",
      "tone": "tense",
      "lines": [
        "我就是那个被崩出来，落到地上的豆子",
        "没有人会管一个在地上的豆子",
        "我像被弹到地上的豆子，终于开始尝试自己决定下一步。"
      ],
      "cues": [
        {
          "id": "scene-19-soft",
          "atMs": 150,
          "sfxId": "softClick"
        }
      ]
    }
  ]
} as const
